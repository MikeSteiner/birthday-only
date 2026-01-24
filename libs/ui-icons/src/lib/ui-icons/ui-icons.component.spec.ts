import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiIconsComponent } from './ui-icons.component';

describe('UiIconsComponent', () => {
  let component: UiIconsComponent;
  let fixture: ComponentFixture<UiIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiIconsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
