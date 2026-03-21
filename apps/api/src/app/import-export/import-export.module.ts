import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Birthday, BirthdaySchema } from '../birthdays/schemas/birthday.schema';
import { ImportExportController } from './import-export.controller';
import { ImportExportService } from './import-export.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Birthday.name, schema: BirthdaySchema }]),
  ],
  controllers: [ImportExportController],
  providers: [ImportExportService],
})
export class ImportExportModule {}