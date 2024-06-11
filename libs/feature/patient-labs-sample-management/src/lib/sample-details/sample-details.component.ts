import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationRoutingService, LocalStorageService, NotificationService, SampleManagementService } from '@ddsi-labs-apps/services';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { SampleDetailsContentComponent } from './components/sample-details-content/sample-details-content.component';
import { PatientDetailsContentComponent } from './components/patient-details-content/patient-details-content.component';
import { ActivatedRoute } from '@angular/router';
import { CaseDetailsContentComponent } from './components/case-details-content/case-details-content.component';
import { Sample } from '@ddsi-labs-apps/models';
import { NotificationSeverity } from '@ddsi-labs-apps/enums';

export type selectionChoice = 'case' | 'patient' | 'sample';
@Component({
  selector: 'ddsi-labs-apps-sample-details',
  standalone: true,
  providers:[NotificationService],
  imports: [CommonModule, SelectButtonModule,ButtonModule, FormsModule, SampleDetailsContentComponent, PatientDetailsContentComponent, CaseDetailsContentComponent],
  templateUrl: './sample-details.component.html',
  styleUrl: './sample-details.component.scss',
})
export class SampleDetailsComponent {
  stateOptions: {label: string, value: selectionChoice}[] = [{ label: 'Echantillon', value: 'sample' }, { label: 'Case', value: 'case' }, { label: 'Patient', value: 'patient' }];

  value: selectionChoice = 'sample';
  idSample: string | undefined;
  sampleDetails: Sample | undefined;
  constructor(private appRouting: ApplicationRoutingService, private route: ActivatedRoute, private sampleMgtService: SampleManagementService, private notificationService: NotificationService){
    this.idSample = this.route.snapshot.paramMap.get('id') || undefined;
    this.getSampleDetails();    
  }
  
  goBack(){
    this.appRouting.goToSampleListPage();
  }

  getSampleDetails() {
    if(this.idSample) {
      this.sampleDetails = this.sampleMgtService.getSampleById(this.idSample)
      console.log('sampleDetails Parent', this.sampleDetails);
      
    }
  }

  saveToStorage(event: Sample | undefined) {
    if(event && !event?.id) {
      this.sampleMgtService.saveSample(event);
      this.notificationService.displayNotification(NotificationSeverity.SUCCESS, "Echantillon - Enregistrement", "Bien effectué")
    } else if(event?.id){
      console.log('update');
      
      this.sampleMgtService.updateSample(event);
      this.notificationService.displayNotification(NotificationSeverity.SUCCESS, "Echantillon- Update", "Details de l'echantillon mis à jour")
    }
  }
}
