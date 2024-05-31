import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetSampleRegistrationComponent } from './setSampleRegistration.component';

describe('SetSampleRegistrationComponent', () => {
  let component: SetSampleRegistrationComponent;
  let fixture: ComponentFixture<SetSampleRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetSampleRegistrationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SetSampleRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
