import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabsSampleManagementComponent } from './labs-sample-management.component';

describe('LabsSampleManagementComponent', () => {
  let component: LabsSampleManagementComponent;
  let fixture: ComponentFixture<LabsSampleManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabsSampleManagementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LabsSampleManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
