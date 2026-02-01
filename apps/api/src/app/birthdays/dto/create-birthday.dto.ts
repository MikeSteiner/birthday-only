import {
  BIRTH_YEAR_ERRORS,
  DAYS_VALIDATION,
  GREETING_MESSAGE_ERRORS,
  GREETING_MESSAGE_VALIDATION,
  MONTHS_INDEX,
  NAME_VALIDATION,
  YEAR_VALIDATION,
} from '@bd-only/shared';
import {
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateBirthdayDto {
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

  // Birth year validation: if provided, must be between 1900 and current year
  @IsOptional()
  @IsInt({ message: 'Birth year must be an integer value' })
  @Min(YEAR_VALIDATION.min, { message: BIRTH_YEAR_ERRORS.min })
  @Max(YEAR_VALIDATION.max, { message: BIRTH_YEAR_ERRORS.max })
  birthYear?: number;

  // Phone number: optional, but must be valid format if provided
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  // Greeting message: optional, 1-500 characters
  @IsOptional()
  @IsString()
  @MinLength(GREETING_MESSAGE_VALIDATION.minLength, {
    message: GREETING_MESSAGE_ERRORS.maxlength,
  })
  @MaxLength(GREETING_MESSAGE_VALIDATION.maxLength, {
    message: GREETING_MESSAGE_ERRORS.maxlength,
  })
  greetingMessage?: string;
}