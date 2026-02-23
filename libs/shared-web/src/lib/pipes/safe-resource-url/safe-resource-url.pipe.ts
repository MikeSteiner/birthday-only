import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'coreSafeResourceUrl',
})
export class SafeResourceUrlPipe implements PipeTransform {
  private readonly domSanitizer = inject(DomSanitizer);

  transform(value: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
