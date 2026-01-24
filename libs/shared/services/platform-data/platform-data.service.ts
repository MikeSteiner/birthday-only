import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { DestroyRef, inject, Injectable, NgZone, PLATFORM_ID, REQUEST, signal } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlatformDataService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly request = inject(REQUEST);
  private readonly document = inject(DOCUMENT);
  private readonly ngZone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);
  
  readonly platform = inject(Platform);

  readonly isBrowser = isPlatformBrowser(this.platformId);
  readonly isServer = isPlatformServer(this.platformId);
  readonly window: Window | null = this.document?.defaultView ?? null;
  readonly documentRef = this.document;
  readonly windowWidthChange = signal<number>(0);

  readonly domainOrigin = this.getDomainOrigin();

  constructor() {
    if (this.isBrowser) {
      this.ngZone.runOutsideAngular(() => {
        fromEvent(window, 'resize').pipe(
          debounceTime(300),
          map((event) => (event.target as Window).innerWidth),
          distinctUntilChanged(),
          takeUntilDestroyed(this.destroyRef),
        ).subscribe(width => {
          this.windowWidthChange.set(width);
        });
      });
    }
  }

  private getDomainOrigin(): string {
    if (this.isBrowser) {
      return this.window?.origin ?? '';
    } else {
      const protocol = this.request?.headers.get('x-forwarded-proto') ?? 'https';
      const host = this.request?.headers.get('host');
      if (!host) {
        return '';
      }

      return `${protocol}://${host}`;
    }
  }
}
