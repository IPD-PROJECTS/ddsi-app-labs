import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseDetailsContentComponent } from './case-details-content.component';

describe('CaseDetailsContentComponent', () => {
  let component: CaseDetailsContentComponent;
  let fixture: ComponentFixture<CaseDetailsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseDetailsContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CaseDetailsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
