import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlateTypeAddComponent } from './plate-type-add.component';

describe('PlateTypeAddComponent', () => {
  let component: PlateTypeAddComponent;
  let fixture: ComponentFixture<PlateTypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlateTypeAddComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlateTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
