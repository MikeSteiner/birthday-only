import { Component, inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { BirthdayFormComponent } from "../birthday-form/birthday-form.component";
import { DialogRef } from "../dialog/dialog-ref";
import { DIALOG_DATA } from "../dialog/dialog.tokens";

export interface BirthdayDialogInputData {
  birthday?: {
    name: string;
    birthDay: number; // 1-31
    birthMonth: number; // 1-12
    birthYear?: number; // optional
  };
}

export interface BirthdayDialogResultData {
  name: string;
  birthDay: number; // 1-31
  birthMonth: number; // 1-12
  birthYear?: number; // optional
}

@Component({
  templateUrl: "./birthday-dialog.component.html",
  standalone: true,
  imports: [BirthdayFormComponent],
})
export class BirthdayDialogComponent {
  private readonly dialogRef =
    inject<DialogRef<BirthdayDialogResultData>>(DialogRef);
  protected readonly data = inject<BirthdayDialogInputData | null>(
    DIALOG_DATA,
    { optional: true },
  );

  readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required]],
    birthDay: [1, [Validators.required, Validators.min(1), Validators.max(31)]],
    birthMonth: [
      1,
      [Validators.required, Validators.min(1), Validators.max(12)],
    ],
    birthYear: [null as number | null],
  });

  ngOnInit() {
    console.log("BirthdayDialogComponent ngOnInit", this.data);
    if (this.data?.birthday) {
      this.form.patchValue(this.data.birthday);
    }
  }

  confirm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();
    const bd: BirthdayDialogResultData = {
      name: formValue.name,
      birthDay: formValue.birthDay,
      birthMonth: formValue.birthMonth,
      birthYear: formValue.birthYear ?? undefined,
    };

    this.dialogRef.close(bd);
  }

  close(): void {
    this.dialogRef.close();
  }
}
