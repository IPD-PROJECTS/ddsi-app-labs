import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePlateTypeComponent } from './create-plate-type.component';

describe('CreatePlateTypeComponent', () => {
  let component: CreatePlateTypeComponent;
  let fixture: ComponentFixture<CreatePlateTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePlateTypeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePlateTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
