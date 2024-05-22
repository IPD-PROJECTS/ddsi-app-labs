import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationRoutingService } from '@ddsi-labs-apps/services';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { SampleDetailsContentComponent } from './components/sample-details-content/sample-details-content.component';
import { PatientDetailsContentComponent } from './components/patient-details-content/patient-details-content.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'ddsi-labs-apps-sample-details',
  standalone: true,
  imports: [CommonModule, SelectButtonModule,ButtonModule, FormsModule, SampleDetailsContentComponent, PatientDetailsContentComponent],
  templateUrl: './sample-details.component.html',
  styleUrl: './sample-details.component.scss',
})
export class SampleDetailsComponent {
  stateOptions: {label: string, value: string}[] = [{ label: 'Echantillon', value: 'sample' },{ label: 'Patient', value: 'patient' }];

  value = 'sample';
  idSample: string | null;
  constructor(private appRouting: ApplicationRoutingService, private route: ActivatedRoute){
    this.idSample = this.route.snapshot.paramMap.get('id');    
  }
  
  goBack(){
    this.appRouting.goToSampleListPage();
  }
}
