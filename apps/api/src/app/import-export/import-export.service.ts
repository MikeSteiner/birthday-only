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

  async importBirthdays(userId: string, items: ImportBirthdayItemDto[]): Promise<ImportResult> {
    const itemsWithKeys = this.attachUniqueKeys(items);
    const newItems = await this.filterExisting(userId, itemsWithKeys);
    const skipped = items.length - newItems.length;

    if (newItems.length === 0) {
      return { imported: 0, skipped, errors: 0 };
    }

    return this.insertItems(userId, newItems, skipped);
  }

  private attachUniqueKeys(items: ImportBirthdayItemDto[]) {
    return items.map((item) => ({
      item,
      uniqueKey: birthdayUniqueKey(item.name, item.birthDay, item.birthMonth),
    }));
  }

  private async filterExisting(userId: string, itemsWithKeys: ReturnType<typeof this.attachUniqueKeys>) {
    const incomingKeys = itemsWithKeys.map((i) => i.uniqueKey);

    const existing = await this.birthdayModel
      .find({ userId, uniqueKey: { $in: incomingKeys } })
      .select('uniqueKey')
      .lean();

    const existingKeys = new Set(existing.map((b) => b.uniqueKey));
    return itemsWithKeys.filter((i) => !existingKeys.has(i.uniqueKey));
  }

  private async insertItems(
    userId: string,
    newItems: ReturnType<typeof this.attachUniqueKeys>,
    skipped: number
  ): Promise<ImportResult> {
    const docs = newItems.map(({ item, uniqueKey }) => ({ ...item, userId, uniqueKey }));

    try {
      const result = await this.birthdayModel.insertMany(docs, { ordered: false });
      return { imported: result.length, skipped, errors: 0 };
    } catch (e: unknown) {
      const inserted = (e as { insertedDocs?: unknown[] }).insertedDocs?.length ?? 0;
      return { imported: inserted, skipped, errors: newItems.length - inserted };
    }
  }
}