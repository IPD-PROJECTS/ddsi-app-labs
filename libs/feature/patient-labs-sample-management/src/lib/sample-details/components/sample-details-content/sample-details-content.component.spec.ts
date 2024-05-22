import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SampleDetailsContentComponent } from './sample-details-content.component';

describe('SampleDetailsContentComponent', () => {
  let component: SampleDetailsContentComponent;
  let fixture: ComponentFixture<SampleDetailsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleDetailsContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SampleDetailsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
