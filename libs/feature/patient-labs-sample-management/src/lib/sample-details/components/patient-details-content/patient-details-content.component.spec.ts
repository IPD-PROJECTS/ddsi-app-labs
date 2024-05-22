import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientDetailsContentComponent } from './patient-details-content.component';

describe('PatientDetailsContentComponent', () => {
  let component: PatientDetailsContentComponent;
  let fixture: ComponentFixture<PatientDetailsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientDetailsContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientDetailsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
