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

const CURRENT_YEAR = new Date().getFullYear();

export class CreateBirthdayDto {
  @IsString()
  @MinLength(1)
  @MaxLength(70)
  name!: string;

  @IsInt()
  @Min(1)
  @Max(31)
  birthDay!: number;

  @IsInt()
  @Min(1)
  @Max(12)
  birthMonth!: number;

  // Birth year validation: if provided, must be between 1900 and current year
  @IsOptional()
  @IsInt({ message: 'Birth year must be an integer value' })
  @Min(1900, { message: 'Birth year must be 1900 or later' })
  @Max(CURRENT_YEAR, { message: 'Birth year cannot be in the future' })
  birthYear?: number;

  // Phone number: optional, but must be valid format if provided
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  // Greeting message: optional, 1-500 characters
  @IsOptional()
  @IsString()
  @MinLength(1, {
    message: 'Greeting message has to contain at least one valid word',
  })
  @MaxLength(500, {
    message: 'Greeting message length must be 500 characters or less',
  })
  greetingMessage?: string;
}