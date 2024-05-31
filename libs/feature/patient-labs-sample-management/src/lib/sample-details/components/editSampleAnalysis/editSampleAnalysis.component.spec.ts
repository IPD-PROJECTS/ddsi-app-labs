import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditSampleAnalysisComponent } from './editSampleAnalysis.component';

describe('EditSampleAnalysisComponent', () => {
  let component: EditSampleAnalysisComponent;
  let fixture: ComponentFixture<EditSampleAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSampleAnalysisComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditSampleAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
