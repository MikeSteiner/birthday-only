import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BirthdayDocument = Birthday & Document;

@Schema({ timestamps: true })
export class Birthday {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, min: 1, max: 31 })
  birthDay!: number;

  @Prop({ required: true, min: 1, max: 12 })
  birthMonth!: number;

  @Prop({ min: 1900, max: 2100 })
  birthYear?: number;
}

export const BirthdaySchema = SchemaFactory.createForClass(Birthday);

// Index for efficient queries
BirthdaySchema.index({ userId: 1, birthMonth: 1, birthDay: 1 });
