import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'bd-ui-expand-panel',
  templateUrl: './expand-panel.component.html',
  styleUrls: ['./expand-panel.component.scss'],
  standalone: true,
  imports: [],
  host: {
    '[class.ui-expand-panel-host]': 'true',
    '[class.expanded]': 'isExpanded()',
    '[class.disabled]': 'disabled()'
  },
})
export class ExpandPanelComponent {
  readonly expanded = input<boolean>(false);
  readonly disabled = input<boolean>(false);

  readonly expandedChange = output<boolean>();

  // Internal expanded state
  readonly isExpanded = signal(this.expanded());

  toggle(): void {
    if (this.disabled()) {
      return;
    }

    const newState = !this.isExpanded();
    this.isExpanded.set(newState);
    this.expandedChange.emit(newState);
  }

  expand(): void {
    if (this.disabled() || this.isExpanded()) {
      return;
    }

    this.isExpanded.set(true);
    this.expandedChange.emit(true);
  }

  collapse(): void {
    if (this.disabled() || !this.isExpanded()) {
      return;
    }

    this.isExpanded.set(false);
    this.expandedChange.emit(false);
  }
}
