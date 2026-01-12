import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBirthdayDto } from './dto/create-birthday.dto';
import { Birthday, BirthdayDocument } from './schemas/birthday.schema';

@Injectable()
export class BirthdaysService {
  constructor(
    @InjectModel(Birthday.name) private birthdayModel: Model<BirthdayDocument>
  ) {}

  async create(userId: string, dto: CreateBirthdayDto) {
    return this.birthdayModel.create({
      ...dto,
      userId,
    });
  }

  async findAll(userId: string): Promise<Birthday[]> {
    return this.birthdayModel
      .find({ userId })
      .sort({ birthMonth: 1, birthDay: 1 })
      .exec();
  }

  async findById(id: string, userId: string): Promise<Birthday | null> {
    return this.birthdayModel.findOne({ _id: id, userId }).exec();
  }

  async update(
    id: string,
    userId: string,
    birthdayData: Partial<Birthday>
  ): Promise<Birthday | null> {
    return this.birthdayModel
      .findOneAndUpdate({ _id: id, userId }, birthdayData, { new: true })
      .exec();
  }

  async delete(id: string, userId: string): Promise<Birthday | null> {
    return this.birthdayModel.findOneAndDelete({ _id: id, userId }).exec();
  }

  async getUpcoming(userId: string, days = 30): Promise<any[]> {
    const birthdays = await this.findAll(userId);
    const today = new Date();
    const currentYear = today.getFullYear();

    const upcomingBirthdays = birthdays.map((birthday) => {
      const thisYearBirthday = new Date(
        currentYear,
        birthday.birthMonth - 1,
        birthday.birthDay
      );
      const nextYearBirthday = new Date(
        currentYear + 1,
        birthday.birthMonth - 1,
        birthday.birthDay
      );

      let targetDate = thisYearBirthday;
      if (thisYearBirthday < today) {
        targetDate = nextYearBirthday;
      }

      const daysUntil = Math.ceil(
        (targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      let age: number | undefined;
      if (birthday.birthYear) {
        age = targetDate.getFullYear() - birthday.birthYear;
      }

      return {
        // TODO: Fix
        // ...birthday.toObject(),
        ...(birthday as any).toObject(),
        daysUntil,
        age,
      };
    });

    return upcomingBirthdays
      .filter((b) => b.daysUntil <= days)
      .sort((a, b) => a.daysUntil - b.daysUntil);
  }

  async getTodaysBirthdays(): Promise<any[]> {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;

    const birthdays = await this.birthdayModel
      .find({
        birthDay: currentDay,
        birthMonth: currentMonth,
      })
      .populate('userId')
      .exec();

    return birthdays.map((birthday) => {
      let age: number | undefined;
      if (birthday.birthYear) {
        age = today.getFullYear() - birthday.birthYear;
      }

      return {
        ...birthday.toObject(),
        age,
      };
    });
  }
}
