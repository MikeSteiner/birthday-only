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
  min: 1,
  max: 12,
} as const;

const CURRENT_YEAR = new Date().getFullYear();
export const YEAR_VALIDATION = {
  min: 1900,
  max: CURRENT_YEAR,
} as const;

export const GREETING_MESSAGE_VALIDATION = {
  minLength: 1,
  maxLength: 500,
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
      Validators.min(MONTHS_INDEX.min + 1),
      Validators.max(MONTHS_INDEX.max + 1)
    ]),
    birthYear: this.formBuilder.control(null, [
      Validators.min(YEAR_VALIDATION.min),
      Validators.max(YEAR_VALIDATION.max)
    ]),
    phoneNumber: this.formBuilder.control(null, [
      Validators.minLength(1),
      Validators.maxLength(100)
    ]),
    greetingMessage: this.formBuilder.control(null, [
      Validators.minLength(GREETING_MESSAGE_VALIDATION.minLength),
      Validators.maxLength(GREETING_MESSAGE_VALIDATION.maxLength)
    ]),
  });
}
