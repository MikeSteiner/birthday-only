import { animate, style, transition, trigger } from '@angular/animations';
import { Component, inject } from '@angular/core';
import { ExpandPanelComponent } from '../expand-panel/expand-panel.component';

@Component({
  selector: 'bd-ui-expand-panel-content',
  standalone: true,
  imports: [],
  templateUrl: './expand-panel-content.component.html',
  styleUrls: ['./expand-panel-content.component.scss'],
  animations: [
    trigger('expandCollapse', [
      transition(':enter', [
        style({ height: '0', opacity: 0 }),
        animate('200ms ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ height: '0', opacity: 0 })),
      ]),
    ]),
  ],
})
export class ExpandPanelContentComponent {
  readonly panel = inject(ExpandPanelComponent);
}