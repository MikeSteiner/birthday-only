import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedApiSharedApiComponent } from './shared-api-shared-api.component';

describe('SharedApiSharedApiComponent', () => {
  let component: SharedApiSharedApiComponent;
  let fixture: ComponentFixture<SharedApiSharedApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedApiSharedApiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedApiSharedApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
