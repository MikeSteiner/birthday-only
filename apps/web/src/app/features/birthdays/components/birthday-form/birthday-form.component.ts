import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  BIRTH_DAY_ERRORS,
  BIRTH_MONTH_ERRORS,
  BIRTH_YEAR_ERRORS,
  getMonthsList,
  GREETING_MESSAGE_ERRORS,
  NAME_ERRORS,
  PHONE_NUMBER_ERRORS,
} from '@bd-only/shared';
import {
  BirthdayFormService,
  EditBirthdayFormGroup,
} from '../../service/birthday-form.service';
import { FormErrorComponent } from '../../ui/form-error/form-error.component';

@Component({
  selector: 'app-birthday-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormErrorComponent],
  templateUrl: './birthday-form.component.html',
  styleUrls: ['./birthday-form.component.scss'],
})
export class BirthdayFormComponent {
  protected readonly birthdayFormService = inject(BirthdayFormService);

  form = input.required<FormGroup>();
  submit = output<any>();

  readonly months = getMonthsList();

  protected readonly NAME_ERRORS = NAME_ERRORS;
  protected readonly BIRTH_DAY_ERRORS = BIRTH_DAY_ERRORS;
  protected readonly BIRTH_MONTH_ERRORS = BIRTH_MONTH_ERRORS;
  protected readonly BIRTH_YEAR_ERRORS = BIRTH_YEAR_ERRORS;
  protected readonly PHONE_NUMBER_ERRORS = PHONE_NUMBER_ERRORS;
  protected readonly GREETING_MESSAGE_ERRORS = GREETING_MESSAGE_ERRORS;

  hasError(controlName: keyof EditBirthdayFormGroup): boolean {
    const control = this.birthdayFormService.editBirthdayForm.controls[controlName];
    return !!(control.invalid && control.touched);
  }
}
