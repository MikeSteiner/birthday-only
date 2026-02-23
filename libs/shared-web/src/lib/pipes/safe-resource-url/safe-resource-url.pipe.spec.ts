import { TestBed } from '@angular/core/testing';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SafeResourceUrlPipe } from './safe-resource-url.pipe';

describe('SafeResourceUrlPipe', () => {
  let pipe: SafeResourceUrlPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SafeResourceUrlPipe],
    });

    sanitizer = TestBed.inject(DomSanitizer);
    pipe = TestBed.inject(SafeResourceUrlPipe);
  });

  it('should sanitize a valid resource URL', () => {
    const url = 'https://example.com/embed/video';
    const expected: SafeResourceUrl = sanitizer.bypassSecurityTrustResourceUrl(url);

    const result = pipe.transform(url);

    expect(result).toEqual(expected);
  });

  it('should still trust and return an unsafe-looking resource URL', () => {
    const unsafeUrl = 'javascript:alert("XSS")';
    const expected: SafeResourceUrl = sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);

    const result = pipe.transform(unsafeUrl);

    expect(result).toEqual(expected);
  });
});
