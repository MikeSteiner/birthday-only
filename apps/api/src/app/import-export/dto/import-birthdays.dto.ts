import {
  DAYS_VALIDATION,
  GREETING_MESSAGE_VALIDATION,
  MONTHS_INDEX,
  NAME_VALIDATION,
  YEAR_VALIDATION,
} from '@bd-only/shared';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

// TODO: Error Handling & Validation Issues
// ⚠️ Critical: Review validation in import-birthdays.dto.ts (60+ lines)
//
// Ensure strong type validation for imported data
// Add validation for date formats, duplicate entries, and malformed CSV/JSON
// Consider file size limits to prevent memory issues
// Suggestion: Add decorators like @IsDateString(), @IsNotEmpty(), and @MaxLength() from class-validator
export class ImportBirthdayItemDto {
  @IsString()
  @MinLength(NAME_VALIDATION.minLength)
  @MaxLength(NAME_VALIDATION.maxLength)
  name!: string;

  @IsInt()
  @Min(DAYS_VALIDATION.min)
  @Max(DAYS_VALIDATION.max)
  birthDay!: number;

  @IsInt()
  @Min(MONTHS_INDEX.min)
  @Max(MONTHS_INDEX.max)
  birthMonth!: number;

  @IsOptional()
  @IsInt()
  @Min(YEAR_VALIDATION.min)
  @Max(YEAR_VALIDATION.max)
  birthYear?: number;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @MinLength(GREETING_MESSAGE_VALIDATION.minLength)
  @MaxLength(GREETING_MESSAGE_VALIDATION.maxLength)
  greetingMessage?: string;
}

export class ImportBirthdaysDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImportBirthdayItemDto)
  birthdays!: ImportBirthdayItemDto[];
}