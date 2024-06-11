import { Component, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { CalendarModule } from 'primeng/calendar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ChipModule } from 'primeng/chip';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import {
  AddTestToSampleComponent
} from '../addTestToSample/addTestToSample.component';
import { SetSampleRegistrationComponent } from '../setSampleRegistration/setSampleRegistration.component';
import { DividerModule } from 'primeng/divider';
import { EditSampleAnalysisComponent } from '../editSampleAnalysis/editSampleAnalysis.component';
import { ConfirmPopup, ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { NotificationService } from '@ddsi-labs-apps/services';
import { NotificationSeverity } from '@ddsi-labs-apps/enums';
import { AnalysisType, Sample } from '@ddsi-labs-apps/models';


@Component({
  selector: 'ddsi-labs-apps-sample-details-content',
  providers: [DialogService, ConfirmationService, NotificationService],
  standalone: true,
  imports: [
    CommonModule,
    DividerModule,
    ConfirmPopupModule,
    DynamicDialogModule,
    ChipModule,
    InputTextareaModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    BadgeModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './sample-details-content.component.html',
  styleUrl: './sample-details-content.component.scss',
})
export class SampleDetailsContentComponent implements OnInit {
  sampleDetailsForm: FormGroup = new FormGroup({});
  date: Date | undefined = new Date();
  motifsPrelevements = [
    'Epidémie',
    'Projet',
    'Dépistage',
    'Inconnu',
    'Contact avec un cas',
  ];
  typesPrelevements = ['Sang', 'Sérum', 'Selle', 'Ecouvillon Nasal'];
  selectedMotif: string | undefined;
  selectedType: string | undefined;
  listAnalyses: AnalysisType[] = [];
  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;
  private dialogService = inject(DialogService);
  private confirmService = inject(ConfirmationService);
  private notificationService = inject(NotificationService);
  @Input() sampleDetails?: Sample;
  @Output() sampleDetailsChange = new EventEmitter<Sample>();
  constructor(private fb: FormBuilder){
    console.log('sampleDetails', this.sampleDetails);
  }

  ngOnInit(): void {
    console.log('sampleDetails ngOnInit', this.sampleDetails);
    
    this.sampleDetailsForm = this.fb.group({
      id: [this.sampleDetails?.id || ''],
      laboDetails: this.fb.group({
        identifiantLabo: [this.sampleDetails?.laboDetails?.identifiantLabo],
        nomLabo: [this.sampleDetails?.laboDetails?.nomLabo || '']
      }),
      sampleOrigine: this.fb.group({
        dateCollect:[this.sampleDetails?.sampleOrigine?.dateCollect ? new Date(this.sampleDetails?.sampleOrigine?.dateCollect) : null],
        hourCollect:[this.sampleDetails?.sampleOrigine?.hourCollect ? new Date(this.sampleDetails?.sampleOrigine?.hourCollect) : null],
        sendDate:[this.sampleDetails?.sampleOrigine?.sendDate ? new Date(this.sampleDetails?.sampleOrigine?.sendDate) : null],
      }),
      reception:[this.sampleDetails?.reception],
      status:[this.sampleDetails?.status || 'Pas encore reçu'],
      comments:[this.sampleDetails?.comments],
      registeredBy:[this.sampleDetails?.registeredBy || 'Sentinelle Agent'],
      sampleContext:[this.sampleDetails?.sampleContext],
      sampleType:[this.sampleDetails?.sampleType],
      analyses: [this.sampleDetails?.analyses || []]
    })
  }



  get getLaboDetailsControl() {
    return (this.sampleDetailsForm.get('laboDetails') as FormGroup).controls
  }
  addSampleAnalysisList() {
    console.log("this.sampleDetailsForm.get('analyses')?.value'", this.sampleDetailsForm.get('analyses')?.value);
    
    const ref = this.dialogService.open(AddTestToSampleComponent, {
      width: '50%',
      breakpoints: { '500px': '75%' },
      data: {
        listAnalyses: this.sampleDetailsForm.get('analyses')?.value,
      },
      draggable: true,
      header: "Ajout d'analyse sur l'echantillon",
    });
    ref.onClose.subscribe((elt: { result: any }) => {
      if (elt?.result) {
        this.listAnalyses.push(...elt.result);
        this.sampleDetailsForm.get('analyses')?.patchValue(elt.result);
        this.sampleDetailsForm.markAsDirty();
        
      }
    });
  }

  accept() {
    this.confirmPopup.accept();
  }
  reject() {
    this.confirmPopup.reject();
  }

  editSampleAnalysis(data: AnalysisType, index: number) {
    const ref = this.dialogService.open(EditSampleAnalysisComponent, {
      draggable: true,
      width: '50%',
      breakpoints: { '500px': '75%' },
      header: "Mise à jour de l'analyse",
      data: {
        sampleAnalysis: data,
        index,
      },
    });

    ref.onClose.subscribe((resp: { result: AnalysisType }) => {
      if (resp?.result) {
        this.listAnalyses[index] = { ...resp.result };
        this.sampleDetailsForm.get('analyses')?.patchValue(this.listAnalyses);
        this.sampleDetailsForm.markAsDirty();
      }
    });
  }

  setSampleRegistrationInfos() {
    this.dialogService.open(SetSampleRegistrationComponent, {
      width: '40%',
      resizable: true,
      draggable: true,
      header: "Enregistrement de la reception de l'echantillon",
    });
  }

  confirm(event: any, sampleAnalysis: AnalysisType, index: number) {
    this.confirmService.confirm({
      target: event.target as EventTarget,
      message: 'Voulez vous vraiment supprimer cet analyse',
      accept: () => {
        this.deleteSampleAnalysis(index);
        this.saveInfos();
        this.notificationService.displayNotification(NotificationSeverity.SUCCESS, 'Suppression', 'Suppression bien effectuée')
      }
    });
  }

  deleteSampleAnalysis(index: number) {
    this.listAnalyses.splice(index, 1);
    this.sampleDetailsForm.get('analyses')?.patchValue(this.listAnalyses);
    this.sampleDetailsForm.markAsDirty();
  }

  saveInfos() {
    console.log('formGroup', this.sampleDetailsForm);
    if(this.sampleDetailsForm.dirty) {
      this.sampleDetails = this.sampleDetailsForm.value;
      this.sampleDetailsChange.emit(this.sampleDetailsForm.value);
      console.log('this.sampleDetailsForm.value', this.sampleDetailsForm.value);
      console.log('this.sampleDetails', this.sampleDetails);
    } else {
      console.log('is sane');
      
    }
    
  }
}
