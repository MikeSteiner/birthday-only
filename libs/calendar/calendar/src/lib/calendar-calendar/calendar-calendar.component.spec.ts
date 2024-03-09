import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarCalendarComponent } from './calendar-calendar.component';

describe('CalendarCalendarComponent', () => {
  let component: CalendarCalendarComponent;
  let fixture: ComponentFixture<CalendarCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarCalendarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
