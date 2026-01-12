import {
  IsString,
  IsInt,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class CreateBirthdayDto {
  @IsString()
  name?: string;

  @IsInt()
  @Min(1)
  @Max(31)
  birthDay!: number;

  @IsInt()
  @Min(1)
  @Max(12)
  birthMonth!: number;

  @IsOptional()
  @IsInt()
  birthYear?: number;
}
