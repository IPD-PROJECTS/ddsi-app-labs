import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPatientDynamicFormComponent } from './add-patient-dynamic-form.component';

describe('AddPatientDynamicFormComponent', () => {
  let component: AddPatientDynamicFormComponent;
  let fixture: ComponentFixture<AddPatientDynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPatientDynamicFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPatientDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
