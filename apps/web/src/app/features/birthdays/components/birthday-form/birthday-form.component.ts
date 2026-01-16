import { Component, input, output, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-birthday-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './birthday-form.component.html',
  styleUrls: ['./birthday-form.component.scss'],
})
export class BirthdayFormComponent {
  readonly formData = input<{
    name?: string;
    birthDay: number;
    birthMonth: number;
    birthYear?: number;
  }>();

  readonly submit = output<{
    name?: string;
    birthDay: number;
    birthMonth: number;
    birthYear?: number;
  }>();

  readonly cancel = output<void>();

  readonly form = inject(FormBuilder).nonNullable.group({
    name: [null as string | null],
    birthDay: [1, [Validators.required, Validators.min(1), Validators.max(31)]],
    birthMonth: [1, [Validators.required, Validators.min(1), Validators.max(12)]],
    birthYear: [null as number | null],
  });

  constructor() {
    effect(() => {
      const data = this.formData();
      if (!data) {
        return;
      }

      this.form.reset({
        name: data.name,
        birthDay: data.birthDay,
        birthMonth: data.birthMonth,
        birthYear: data.birthYear ?? null,
      });
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    this.submit.emit({
      name: value.name ?? undefined,
      birthDay: value.birthDay,
      birthMonth: value.birthMonth,
      birthYear: value.birthYear ?? undefined,
    });
  }
}
