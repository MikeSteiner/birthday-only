import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BirthdaysBirthdaysComponent } from './birthdays-birthdays.component';

describe('BirthdaysBirthdaysComponent', () => {
  let component: BirthdaysBirthdaysComponent;
  let fixture: ComponentFixture<BirthdaysBirthdaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirthdaysBirthdaysComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BirthdaysBirthdaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
