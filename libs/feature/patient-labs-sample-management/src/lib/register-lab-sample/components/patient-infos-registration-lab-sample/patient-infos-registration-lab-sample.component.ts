import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPatientsComponent } from '../list-patients/list-patients.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'ddsi-labs-apps-patient-infos-registration-lab-sample',
  standalone: true,
  imports: [CommonModule, ListPatientsComponent, ButtonModule],
  templateUrl: './patient-infos-registration-lab-sample.component.html',
  styleUrl: './patient-infos-registration-lab-sample.component.scss',
})
export class PatientInfosRegistrationLabSampleComponent {}
