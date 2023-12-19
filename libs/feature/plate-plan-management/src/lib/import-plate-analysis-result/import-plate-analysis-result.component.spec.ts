import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportPlateAnalysisResultComponent } from './import-plate-analysis-result.component';

describe('ImportPlateAnalysisResultComponent', () => {
  let component: ImportPlateAnalysisResultComponent;
  let fixture: ComponentFixture<ImportPlateAnalysisResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportPlateAnalysisResultComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportPlateAnalysisResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
