import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterLabSampleComponent } from './register-lab-sample.component';

describe('RegisterLabSampleComponent', () => {
  let component: RegisterLabSampleComponent;
  let fixture: ComponentFixture<RegisterLabSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterLabSampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterLabSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
