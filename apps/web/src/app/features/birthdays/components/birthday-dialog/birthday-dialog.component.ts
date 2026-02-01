import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@bd-only/bd-dialog';
import {
  BirthdayFormService,
  EditBirthdayFormValue,
} from '../../service/birthday-form.service';
import { BirthdayFormComponent } from '../birthday-form/birthday-form.component';

@Component({
  templateUrl: './birthday-dialog.component.html',
  styleUrls: ['./birthday-dialog.component.scss'],
  imports: [BirthdayFormComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BirthdayDialogComponent implements OnInit {
  private readonly dialogRef =
    inject<DialogRef<EditBirthdayFormValue>>(DialogRef);
  private readonly birthdayFormService = inject(BirthdayFormService);
  protected readonly data = inject<EditBirthdayFormValue | null>(DIALOG_DATA, {
    optional: true,
  });

  readonly form = this.birthdayFormService.editBirthdayForm;

  ngOnInit() {
    if (this.data) {
      this.form.patchValue(this.data);
    } else {
      this.form.reset();
    }
  }

  confirm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.markAsDirty();
      return;
    }

    const formValue = this.form.getRawValue();
    const bd: EditBirthdayFormValue = {
      name: formValue.name,
      birthDay: Number(formValue.birthDay),
      birthMonth: Number(formValue.birthMonth),
      birthYear: formValue.birthYear ?? null,
      phoneNumber: formValue.phoneNumber ?? null,
      greetingMessage: formValue.greetingMessage ?? null,
    };

    this.dialogRef.close(bd);
  }

  close(): void {
    this.dialogRef.close();
  }
}
