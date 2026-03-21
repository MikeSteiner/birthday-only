import { ImportResult } from '@bd-only/shared';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Birthday, BirthdayDocument } from '../birthdays/schemas/birthday.schema';
import { birthdayUniqueKey } from '../utils/birthday.utils';
import { ImportBirthdayItemDto } from './dto/import-birthdays.dto';

@Injectable()
export class ImportExportService {
  constructor(
    @InjectModel(Birthday.name) private birthdayModel: Model<BirthdayDocument>
  ) {}

  async importBirthdays(
    userId: string,
    items: ImportBirthdayItemDto[]
  ): Promise<ImportResult> {
    const incomingItemsWithKey = items.map((item) => ({
      item,
      uniqueKey: birthdayUniqueKey(item.name, item.birthDay, item.birthMonth),
    }));
    const incomingKeys = incomingItemsWithKey.map((i) => i.uniqueKey);

    const existing = await this.birthdayModel
      .find({ userId, uniqueKey: { $in: incomingKeys } })
      .select('uniqueKey')
      .lean();
    const existingKeys = new Set(existing.map((b) => b.uniqueKey));
    const incomingAndNewItems = incomingItemsWithKey.filter((i) => !existingKeys.has(i.uniqueKey));
    const skipped = items.length - incomingAndNewItems.length;

    if (incomingAndNewItems.length === 0) {
      return {
        imported: 0,
        skipped,
        errors: 0
      };
    }

    const docs = incomingAndNewItems.map(({ item, uniqueKey }) => ({ ...item, userId, uniqueKey }));

    try {
      const result = await this.birthdayModel.insertMany(docs, {
        ordered: false,
      });

      return {
        imported: result.length,
        skipped,
        errors: 0
      };
    } catch (e: unknown) {
      const inserted = (e as { insertedDocs?: unknown[] }).insertedDocs?.length ?? 0;

      return {
        imported: inserted,
        skipped,
        errors: incomingAndNewItems.length - inserted
      };
    }
  }
}