import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SampleReceptionSectionComponent } from './sample-reception-section.component';

describe('SampleReceptionSectionComponent', () => {
  let component: SampleReceptionSectionComponent;
  let fixture: ComponentFixture<SampleReceptionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleReceptionSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SampleReceptionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
