import { Directive, input, computed, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BIRTHDAY_ICONS, IconName } from '../data/icons.data';

@Directive({
  selector: 'svg[uiIcon]',
  standalone: true,
  host: {
    '[innerHTML]': 'safeSvg()',
    'viewBox': '0 0 24 24',
    'fill': 'none',
    'stroke': 'currentColor',
    'stroke-width': '2',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  }
})
export class BdIconDirective {
  private readonly sanitizer = inject(DomSanitizer);

  name = input.required<IconName>({ alias: 'svgName' });

  // Compute the safe HTML for the SVG paths
  safeSvg = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(BIRTHDAY_ICONS[this.name()])
  );
}