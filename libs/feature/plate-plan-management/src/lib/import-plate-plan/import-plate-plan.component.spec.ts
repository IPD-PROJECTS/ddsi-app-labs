import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportPlatePlanComponent } from './import-plate-plan.component';

describe('ImportPlatePlanComponent', () => {
  let component: ImportPlatePlanComponent;
  let fixture: ComponentFixture<ImportPlatePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportPlatePlanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportPlatePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
