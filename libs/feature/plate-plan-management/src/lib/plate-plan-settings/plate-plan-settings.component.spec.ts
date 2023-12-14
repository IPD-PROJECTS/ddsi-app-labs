import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatePlanSettingsComponent } from './plate-plan-settings.component';

describe('PlatePlanSettingsComponent', () => {
  let component: PlatePlanSettingsComponent;
  let fixture: ComponentFixture<PlatePlanSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatePlanSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlatePlanSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
