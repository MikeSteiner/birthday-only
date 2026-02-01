import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@bd-only/bd-dialog';

export interface ConfirmationDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogComponent {
  private readonly dialogRef = inject<DialogRef<boolean>>(DialogRef);
  private readonly data = inject<ConfirmationDialogData>(DIALOG_DATA);

  readonly title = this.data.title;
  readonly message = this.data.message;
  readonly confirmText = this.data.confirmText ?? 'Confirm';
  readonly cancelText = this.data.cancelText ?? 'Cancel';
  readonly type = this.data.type ?? 'danger';

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}