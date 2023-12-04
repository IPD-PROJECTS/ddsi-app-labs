import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalSelectItemForPlateComponent } from './modal-select-item-for-plate.component';

describe('ModalSelectItemForPlateComponent', () => {
  let component: ModalSelectItemForPlateComponent;
  let fixture: ComponentFixture<ModalSelectItemForPlateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSelectItemForPlateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalSelectItemForPlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
