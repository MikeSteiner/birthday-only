import {
  Component,
  ComponentRef,
  inject,
  OnDestroy,
} from '@angular/core';
import { DialogRef } from './dialog-ref';

@Component({
  selector: 'app-dialog-container',
  standalone: true,
  template: `
    <div class="dialog-backdrop" (click)="close()">
      <div
        class="dialog-panel"
        (click)="$event.stopPropagation()"
      >
        <ng-content />
      </div>
    </div>
  `,
})
export class DialogContainerComponent implements OnDestroy {
  private readonly dialogRef = inject(DialogRef);

  close(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.dialogRef.close();
  }
}
