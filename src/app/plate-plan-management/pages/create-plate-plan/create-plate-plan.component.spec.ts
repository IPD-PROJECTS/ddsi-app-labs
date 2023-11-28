import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePlatePlanComponent } from './create-plate-plan.component';

describe('CreatePlatePlanComponent', () => {
  let component: CreatePlatePlanComponent;
  let fixture: ComponentFixture<CreatePlatePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePlatePlanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePlatePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
