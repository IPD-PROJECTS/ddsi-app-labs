import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientsLabsSampleListComponent } from './patients-labs-sample-list.component';

describe('PatientsLabsSampleListComponent', () => {
  let component: PatientsLabsSampleListComponent;
  let fixture: ComponentFixture<PatientsLabsSampleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientsLabsSampleListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientsLabsSampleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
