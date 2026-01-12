import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BirthdaysController } from './birthdays.controller';
import { BirthdaysService } from './birthdays.service';
import { Birthday, BirthdaySchema } from './schemas/birthday.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Birthday.name, schema: BirthdaySchema },
    ]),
  ],
  controllers: [BirthdaysController],
  providers: [BirthdaysService],
  exports: [BirthdaysService],
})
export class BirthdaysModule {}
