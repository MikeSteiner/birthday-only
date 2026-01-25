import { Component, input } from '@angular/core';
import { IconName } from '../data/icons.data';
import { BdIconDirective } from './bd-icon.directive';

@Component({
  selector: 'bd-icon',
  standalone: true,
  templateUrl: './bd-icon.component.html',
  styleUrls: ['./bd-icon.component.scss'],
  hostDirectives: [
    {
      directive: BdIconDirective,
      inputs: ['svgName'],
    },
  ],
})
export class BdIconComponent {
  readonly svgName = input.required<IconName>();
}