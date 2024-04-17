import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ApplicationRoutingService } from '@ddsi-labs-apps/services';
import { StepperModule } from 'primeng/stepper';
import { PatientInfosRegistrationLabSampleComponent } from './components/patient-infos-registration-lab-sample/patient-infos-registration-lab-sample.component';
import { SampleInfosRegistrationLabSampleComponent } from './components/sample-infos-registration-lab-sample/sample-infos-registration-lab-sample.component';

@Component({
  selector: 'ddsi-labs-apps-register-lab-sample',
  standalone: true,
  imports: [CommonModule, ButtonModule, StepperModule, SampleInfosRegistrationLabSampleComponent, PatientInfosRegistrationLabSampleComponent],
  templateUrl: './register-lab-sample.component.html',
  styleUrl: './register-lab-sample.component.scss',
})
export class RegisterLabSampleComponent {
  active = 0;
  hasCompleteForms = false;
  constructor(private appRouting: ApplicationRoutingService){}
  
  goBack(){
    this.appRouting.goToSampleListPage();
  }

  onNext(f: {emit: VoidFunction}){ 
    this.hasCompleteForms = true;
    f.emit();
  }
}
