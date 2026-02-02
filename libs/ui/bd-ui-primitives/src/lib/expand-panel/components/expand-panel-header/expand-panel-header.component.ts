import { Component, inject, HostListener } from '@angular/core';
import { BdIconComponent } from '@bd-only/bd-icons';
import { ExpandPanelComponent } from '../expand-panel/expand-panel.component';

@Component({
  selector: 'bd-ui-expand-panel-header',
  templateUrl: './expand-panel-header.component.html',
  styleUrls: ['./expand-panel-header.component.scss'],
  imports: [BdIconComponent],
  standalone: true,
  host: {
    'role': 'button',
    'tabindex': '0',
    '[attr.aria-expanded]': 'panel.isExpanded()',
    '[attr.aria-disabled]': 'panel.disabled()',
  }
})
export class ExpandPanelHeaderComponent {
  readonly panel = inject(ExpandPanelComponent);

  @HostListener('click')
  onClick(): void {
    this.panel.toggle();
  }

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    event.preventDefault();
    this.panel.toggle();
  }
}