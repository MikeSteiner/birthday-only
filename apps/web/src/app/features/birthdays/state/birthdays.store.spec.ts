import { TestBed } from "@angular/core/testing";
import { BirthdaysStore } from "./bithdays.store";

describe("BirthdaysStore", () => {
  let service: BirthdaysStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BirthdaysStore,
        // MockProvider(BirthdayApiService)
      ],
    });

    service = TestBed.inject(BirthdaysStore);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
