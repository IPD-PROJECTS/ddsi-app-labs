import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTestToSampleComponent } from './addTestToSample.component';

describe('AddTestToSampleComponent', () => {
  let component: AddTestToSampleComponent;
  let fixture: ComponentFixture<AddTestToSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTestToSampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTestToSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
