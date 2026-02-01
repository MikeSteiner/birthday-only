export interface Birthday {
  name: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number | null;
  phoneNumber: string | null;
  greetingMessage: string | null;
}

export interface BirthdayDto extends Birthday {
  _id: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpcomingBirthday extends BirthdayDto {
  daysUntil: number;
  age?: number;
}

export interface UpdateBirthdayRequest extends Birthday {
  _id: string;
}
