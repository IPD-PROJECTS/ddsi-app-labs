import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'ddsi-labs-apps-patient-details-content',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './patient-details-content.component.html',
  styleUrl: './patient-details-content.component.scss',
})
export class PatientDetailsContentComponent {}
