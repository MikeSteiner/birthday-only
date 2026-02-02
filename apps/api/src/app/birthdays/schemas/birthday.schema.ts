import {
  DAYS_VALIDATION,
  GREETING_MESSAGE_VALIDATION,
  MONTHS_INDEX,
  NAME_VALIDATION,
  YEAR_VALIDATION
} from '@bd-only/shared';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BirthdayDocument = Birthday & Document;

@Schema({ timestamps: true })
export class Birthday {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId;

  @Prop({
    required: true,
    trim: true,
    minlength: NAME_VALIDATION.minLength,
    maxlength: NAME_VALIDATION.maxLength,
  })
  name!: string;

  @Prop({
    required: true,
    min: DAYS_VALIDATION.min,
    max: DAYS_VALIDATION.max,
    type: Number,
  })
  birthDay!: number;

  @Prop({
    required: true,
    min: MONTHS_INDEX.min,
    max: MONTHS_INDEX.max,
    type: Number,
  })
  birthMonth!: number;

  @Prop({
    required: false,
    min: YEAR_VALIDATION.min,
    max: YEAR_VALIDATION.max,
    type: Number,
  })
  birthYear?: number;

  @Prop({
    required: false,
    trim: true,
    maxlength: 100,
    type: String,
  })
  phoneNumber?: string;

  @Prop({
    required: false,
    trim: true,
    minlength: GREETING_MESSAGE_VALIDATION.minLength,
    maxlength: GREETING_MESSAGE_VALIDATION.maxLength,
    type: String,
  })
  greetingMessage?: string;
}

export const BirthdaySchema = SchemaFactory.createForClass(Birthday);

// Indexes for efficient queries
BirthdaySchema.index({ userId: 1, birthMonth: 1, birthDay: 1 });
BirthdaySchema.index({ userId: 1, name: 1 });