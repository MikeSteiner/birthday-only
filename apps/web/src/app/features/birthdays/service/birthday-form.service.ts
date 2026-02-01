import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  DAYS_VALIDATION,
  GREETING_MESSAGE_VALIDATION,
  MONTHS_INDEX,
  NAME_VALIDATION,
  YEAR_VALIDATION
} from '@bd-only/shared';

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
