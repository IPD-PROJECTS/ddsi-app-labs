import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlateTypeListComponent } from './plate-type-list.component';

describe('PlateTypeListComponent', () => {
  let component: PlateTypeListComponent;
  let fixture: ComponentFixture<PlateTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlateTypeListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlateTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
