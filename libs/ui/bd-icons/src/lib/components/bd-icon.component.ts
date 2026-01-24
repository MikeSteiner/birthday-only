import { Component, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  private readonly sanitizer = inject(DomSanitizer);

  readonly svgName = input.required<IconName>();
}