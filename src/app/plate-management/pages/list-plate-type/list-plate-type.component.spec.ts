import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPlateTypeComponent } from './list-plate-type.component';

describe('ListPlateTypeComponent', () => {
  let component: ListPlateTypeComponent;
  let fixture: ComponentFixture<ListPlateTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPlateTypeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListPlateTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
