import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],

})
export class ModalComponent {
  readonly open = input<boolean>(false);
  readonly close = output<void>();
}
