import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SampleAnalysisSectionComponent } from './sample-analysis-section.component';

describe('SampleAnalysisSectionComponent', () => {
  let component: SampleAnalysisSectionComponent;
  let fixture: ComponentFixture<SampleAnalysisSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleAnalysisSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SampleAnalysisSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
