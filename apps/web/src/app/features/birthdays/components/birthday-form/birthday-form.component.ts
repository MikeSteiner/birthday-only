import { CommonModule } from "@angular/common";
import { Component, input, output } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { getMonthName, getMonthsList } from '@bd-only/shared';
import { EditBirthdayFormGroup } from '../../service/birthday-form.service';

@Component({
  selector: "app-birthday-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./birthday-form.component.html",
  styleUrls: ["./birthday-form.component.scss"],
})
export class BirthdayFormComponent {
  form = input.required<FormGroup>();
  submit = output<any>();

  readonly getMonthName = getMonthName;

  readonly months = getMonthsList();

  hasError(controlName: keyof EditBirthdayFormGroup): boolean {
    const control = this.form().controls[controlName];
    return !!(control.invalid && (control.dirty || control.touched));
  }
}
