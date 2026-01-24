import { DOCUMENT } from '@angular/common';
import { NgZone, PLATFORM_ID, REQUEST } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MockInstance, MockProvider, ngMocks } from 'ng-mocks';
import { PlatformDataService } from './platform-data.service';

describe('PlatformDataService', () => {
  const fakeDomainOrigin = 'https://dskhome.bg';
  const fakeHost = 'dskhome.bg';
  const mockDocument = document.implementation.createHTMLDocument('Test');
  const mockWindow = {
    origin: fakeDomainOrigin,
  };
  Object.defineProperty(mockDocument, 'defaultView', {
    value: mockWindow,
  });

  const mockHeaders = new Map([
    ['x-forwarded-proto', 'https'],
    ['host', fakeHost]
  ]);
  const mockRequest = {
    headers: {
      get: (key: string): string | undefined => mockHeaders.get(key),
    }
  };

  beforeEach(() => {
    ngMocks.autoSpy('jest');
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlatformDataService,
        MockProvider(DOCUMENT, mockDocument),
        MockProvider(PLATFORM_ID, 'none'),
        MockProvider(REQUEST, mockRequest, 'useValue'),
      ],
    });
  });

  afterEach(() => ngMocks.autoSpy('reset'));

  describe('isPlatformBrowser', () => {
    beforeAll(MockInstance.remember);
    MockInstance.scope();
    afterAll(MockInstance.restore);


    beforeEach(() => {
      MockInstance(PLATFORM_ID, () => 'browser');
    });

    it('isBrowser and isServer should correct booleans when platform is browser', () => {
      const service = TestBed.inject(PlatformDataService);

      expect(service.isBrowser).toBe(true);
      expect(service.isServer).toBe(false);
    });
  });

  describe('isPlatformServer', () => {
    beforeAll(MockInstance.remember);
    MockInstance.scope();
    afterEach(MockInstance.restore);

    beforeEach(() => {
      MockInstance(PLATFORM_ID, () => 'server');

    });

    it('isBrowser and isServer should correct booleans when platform is server', () => {
      const service = TestBed.inject(PlatformDataService);

      expect(service.isBrowser).toBe(false);
      expect(service.isServer).toBe(true);
    });
  });

  describe('domainOrigin', () => {
    describe('isBrowser context', () => {
      beforeAll(MockInstance.remember);
      MockInstance.scope();
      afterAll(MockInstance.restore);

      beforeEach(() => {
        MockInstance(PlatformDataService, 'isBrowser', true);
        MockInstance(PlatformDataService, 'isServer', false);
      });

      it('should return window origin in browser', () => {
        const service = TestBed.inject(PlatformDataService);

        expect(service.domainOrigin).toBe(fakeDomainOrigin);
      });
    });

    describe('isServer context', () => {
      beforeAll(MockInstance.remember);
      MockInstance.scope();
      afterAll(MockInstance.restore);

      beforeEach(() => {
        MockInstance(PlatformDataService, 'isBrowser', false);
        MockInstance(PlatformDataService, 'isServer', true);
      });

      it('should return constructed origin from request headers on server', () => {
        const service = TestBed.inject(PlatformDataService);

        expect(service.domainOrigin).toBe(fakeDomainOrigin);
      });

      it('should return empty string if `host` is missing', () => {
        const noHostHeaders = new Map([
          ['x-forwarded-proto', 'http'],
          ['host', undefined],
        ]);
        mockRequest.headers = {
          get: (key: string): string | undefined => noHostHeaders.get(key),
        };
        const service = TestBed.inject(PlatformDataService);

        expect(service.domainOrigin).toBe('');
      });

      it('should use `https` if `x-forwarded-proto` is missing', () => {
        const noProtocolHeaders = new Map([
          ['x-forwarded-proto', undefined],
          ['host', fakeHost]]
        );
        mockRequest.headers = {
          get: (key: string): string | undefined => noProtocolHeaders.get(key),
        };
        const service = TestBed.inject(PlatformDataService);

        expect(service.domainOrigin).toContain('https://');
      });

      [
        { protocol: 'http', host: 'dskhome.bg', expected: 'http://dskhome.bg' },
        { protocol: 'http', host: 'dskhome.net', expected: 'http://dskhome.net' },
        { protocol: 'https', host: 'dskhome.bg', expected: 'https://dskhome.bg' },
        { protocol: 'https', host: 'dskhome.net', expected: 'https://dskhome.net' },
      ].forEach(({ protocol, host, expected }) => {
        it(`should return ${expected} when protocol='${protocol}' and host='${host}' from request headers on server`, () => {
          const noProtocolHeaders = new Map([
            ['x-forwarded-proto', protocol],
            ['host', host]]
          );
          const getHeaders = (key: string): string | undefined => noProtocolHeaders.get(key);
          mockRequest.headers = {
            get: getHeaders,
          };
          const service = TestBed.inject(PlatformDataService);

          expect(service.domainOrigin).toBe(expected);
        });
      });
    });

    describe('pushEventToDataLayer', () => {
      beforeAll(() => MockInstance.remember());
      MockInstance.scope();
      afterAll(() => MockInstance.restore());

      afterEach(() => {
        // Clean up any modifications to window.dataLayer
        const service = TestBed.inject(PlatformDataService);
        if (service.window?.dataLayer) {
          service.window.dataLayer.length = 0;
        }
      });

      it('should push event with data to dataLayer when in browser and dataLayer exists', () => {
        MockInstance(PLATFORM_ID, () => 'browser');
        const service = TestBed.inject(PlatformDataService);

        // Setup dataLayer as an empty array on window
        if (service.window) {
          service.window.dataLayer = [];
        }

        const eventName = 'testEvent';
        const eventData = { key: 'value' };

        service.pushEventToDataLayer(eventName, eventData);

        expect(service.window?.dataLayer).toHaveLength(1);
        expect(service.window?.dataLayer?.[0]).toEqual({ event: eventName, ...eventData });
      });

      it('should push event without additional data to dataLayer when only event string is provided', () => {
        MockInstance(PLATFORM_ID, () => 'browser');
        const service = TestBed.inject(PlatformDataService);

        if (service.window) {
          service.window.dataLayer = [];
        }

        const eventName = 'simpleEvent';

        service.pushEventToDataLayer(eventName);

        expect(service.window?.dataLayer).toHaveLength(1);
        expect(service.window?.dataLayer?.[0]).toEqual({ event: eventName });
      });

      it('should not throw or push when in browser but dataLayer is undefined', () => {
        MockInstance(PLATFORM_ID, () => 'browser');
        const service = TestBed.inject(PlatformDataService);

        if (service.window) {
          delete service.window.dataLayer;
        }

        expect(() => service.pushEventToDataLayer('event')).not.toThrow();
      });

      it('should not throw or push when not in browser (server)', () => {
        MockInstance(PLATFORM_ID, () => 'server');
        const service = TestBed.inject(PlatformDataService);

        expect(() => service.pushEventToDataLayer('event')).not.toThrow();
      });
    });
  });

  describe('windowWidthChange signal', () => {
    beforeAll(() => MockInstance.remember());
    MockInstance.scope();
    afterAll(() => MockInstance.restore());

    beforeEach(() => {
      MockInstance(PLATFORM_ID, () => 'browser');
      // Ensure NgZone is not actually runOutsideAngular to simplify testing
      MockInstance(NgZone, 'runOutsideAngular', <T>(fn: () => T): T => fn());
    });

    it('should initially be 0', () => {
      const service = TestBed.inject(PlatformDataService);
      expect(service.windowWidthChange()).toBe(0);
    });

    it('should update windowWidthChange on window resize (debounced)', fakeAsync(() => {
      const service = TestBed.inject(PlatformDataService);

      // Simulate resize
      window.innerWidth = 1234;
      window.dispatchEvent(new Event('resize'));

      tick(299);
      expect(service.windowWidthChange()).toBe(0); // Still debouncing

      tick(1); // Hit debounce time
      expect(service.windowWidthChange()).toBe(1234);

      // Simulate another resize with a different width
      window.innerWidth = 800;
      window.dispatchEvent(new Event('resize'));
      tick(300);
      expect(service.windowWidthChange()).toBe(800);
    }));

    it('should not update signal if width doesn’t change (distinctUntilChanged)', fakeAsync(() => {
      const service = TestBed.inject(PlatformDataService);

      window.innerWidth = 1000;
      window.dispatchEvent(new Event('resize'));
      tick(300);
      expect(service.windowWidthChange()).toBe(1000);

      // Same width again
      window.dispatchEvent(new Event('resize'));
      tick(300);
      expect(service.windowWidthChange()).toBe(1000); // Should remain unchanged
    }));
  });
});
