import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatePlanPreviewBlockComponent } from './plate-plan-preview-block.component';

describe('PlatePlanPreviewBlockComponent', () => {
  let component: PlatePlanPreviewBlockComponent;
  let fixture: ComponentFixture<PlatePlanPreviewBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatePlanPreviewBlockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlatePlanPreviewBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
