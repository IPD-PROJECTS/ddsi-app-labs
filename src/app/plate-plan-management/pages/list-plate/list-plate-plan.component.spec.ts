import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPlatePlanComponent } from './list-plate-plan.component';

describe('ListPlatePlanComponent', () => {
  let component: ListPlatePlanComponent;
  let fixture: ComponentFixture<ListPlatePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListPlatePlanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListPlatePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
