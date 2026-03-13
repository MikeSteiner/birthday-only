import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Birthday, BirthdayDocument } from '../birthdays/schemas/birthday.schema';
import { ImportBirthdayItemDto } from './dto/import-birthdays.dto';

export interface ImportResult {
  imported: number;
  errors: number;
}

@Injectable()
export class ImportExportService {
  constructor(
    @InjectModel(Birthday.name) private birthdayModel: Model<BirthdayDocument>
  ) {}

  async importBirthdays(
    userId: string,
    items: ImportBirthdayItemDto[]
  ): Promise<ImportResult> {
    const docs = items.map((item) => ({ ...item, userId }));

    try {
      const result = await this.birthdayModel.insertMany(docs, {
        ordered: false,
      });
      return { imported: result.length, errors: 0 };
    } catch (e: any) {
      const inserted: number = e.insertedDocs?.length ?? 0;
      return { imported: inserted, errors: items.length - inserted };
    }
  }
}