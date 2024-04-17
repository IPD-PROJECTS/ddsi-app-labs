import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientInfosRegistrationLabSampleComponent } from './patient-infos-registration-lab-sample.component';

describe('PatientInfosRegistrationLabSampleComponent', () => {
  let component: PatientInfosRegistrationLabSampleComponent;
  let fixture: ComponentFixture<PatientInfosRegistrationLabSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientInfosRegistrationLabSampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      PatientInfosRegistrationLabSampleComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
