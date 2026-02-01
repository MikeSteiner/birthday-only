import {
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { DialogRef } from '../dialog-ref';

@Component({
  selector: 'bd-dialog-container',
  templateUrl: './dialog-container.component.html',
  standalone: true,
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
