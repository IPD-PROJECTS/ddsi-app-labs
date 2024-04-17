import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SampleInfosRegistrationLabSampleComponent } from './sample-infos-registration-lab-sample.component';

describe('SampleInfosRegistrationLabSampleComponent', () => {
  let component: SampleInfosRegistrationLabSampleComponent;
  let fixture: ComponentFixture<SampleInfosRegistrationLabSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleInfosRegistrationLabSampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      SampleInfosRegistrationLabSampleComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
