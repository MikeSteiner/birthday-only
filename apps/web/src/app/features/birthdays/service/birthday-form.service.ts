import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export const NAME_VALIDATION = {
  minLength: 1,
  maxLength: 70,
} as const;

export const DAYS_VALIDATION = {
  min: 1,
  max: 31,
} as const;

export const MONTHS_INDEX = {
  min: 0,
  max: 11,
} as const;

const CURRENT_YEAR = new Date().getFullYear();
export const YEAR_VALIDATION = {
  min: 1900,
  max: CURRENT_YEAR,
} as const;

export const PHONE_VALIDATION = {
  minLength: 1,
  maxLength: 100,
} as const;

export const GREETING_MESSAGE_VALIDATION = {
  minLength: 1,
  maxLength: 500,
} as const;

export const NAME_ERRORS = {
  required: 'Name is required',
  maxlength: `Name must be at most ${NAME_VALIDATION.maxLength} characters`,
} as const;

export const BIRTH_DAY_ERRORS = {
  required: 'Day is required',
  min: `Day must be between ${DAYS_VALIDATION.min} and ${DAYS_VALIDATION.max}`,
  max: `Day must be between ${DAYS_VALIDATION.min} and ${DAYS_VALIDATION.max}`,
} as const;

export const BIRTH_MONTH_ERRORS = {
  required: 'Month is required',
  min: 'Please select a valid month',
  max: 'Please select a valid month',
} as const;

export const BIRTH_YEAR_ERRORS = {
  min: `Year must be ${YEAR_VALIDATION.min} or later`,
  max: `Year cannot be later than ${YEAR_VALIDATION.max}`,
} as const;

export const PHONE_NUMBER_ERRORS = {
  minlength: 'Phone number is too short',
  maxlength: `Phone number must be at most ${PHONE_VALIDATION.maxLength} characters`,
} as const;

export const GREETING_MESSAGE_ERRORS = {
  minlength: 'Greeting message cannot be empty',
  maxlength: `Greeting must be at most ${GREETING_MESSAGE_VALIDATION.maxLength} characters`,
} as const;

export interface EditBirthdayFormGroup {
  name: FormControl<string>;
  birthDay: FormControl<number>;
  birthMonth: FormControl<number>;
  birthYear: FormControl<number | null>;
  phoneNumber: FormControl<string | null>;
  greetingMessage: FormControl<string | null>;
}

export type EditBirthdayFormValue = ReturnType<
  FormGroup<EditBirthdayFormGroup>['getRawValue']
>;

@Injectable({ providedIn: 'root' })
export class BirthdayFormService {
  private readonly formBuilder = inject(FormBuilder);

  editBirthdayForm = this.formBuilder.nonNullable.group<EditBirthdayFormGroup>({
    name: this.formBuilder.nonNullable.control('', [
      Validators.required,
      Validators.minLength(NAME_VALIDATION.minLength),
      Validators.maxLength(NAME_VALIDATION.maxLength)
    ]),
    birthDay: this.formBuilder.nonNullable.control(13, [
      Validators.required,
      Validators.min(DAYS_VALIDATION.min),
      Validators.max(DAYS_VALIDATION.max)
    ]),
    birthMonth: this.formBuilder.nonNullable.control(5, [
      Validators.required,
      Validators.min(MONTHS_INDEX.min),
      Validators.max(MONTHS_INDEX.max)
    ]),
    birthYear: this.formBuilder.control<number | null>(null, [
      Validators.min(YEAR_VALIDATION.min),
      Validators.max(YEAR_VALIDATION.max)
    ]),
    phoneNumber: this.formBuilder.control<string | null>(null, [
      Validators.minLength(1),
      Validators.maxLength(100)
    ]),
    greetingMessage: this.formBuilder.control<string | null>(null, [
      Validators.minLength(GREETING_MESSAGE_VALIDATION.minLength),
      Validators.maxLength(GREETING_MESSAGE_VALIDATION.maxLength)
    ]),
  });
}
