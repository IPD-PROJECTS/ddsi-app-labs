import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';
import { CaseDetails, Sample } from '@ddsi-labs-apps/models';

@Component({
  selector: 'ddsi-labs-apps-case-details-content',
  standalone: true,
  imports: [CommonModule,MultiSelectModule, TabViewModule, ButtonModule, InputTextModule, CalendarModule, FormsModule, DropdownModule, AutoCompleteModule, InputTextareaModule, ReactiveFormsModule],
  templateUrl: './case-details-content.component.html',
  styleUrl: './case-details-content.component.scss',
})
export class CaseDetailsContentComponent implements OnInit {
  caseDetailsForm: FormGroup = new FormGroup({});
  date = new Date();
  listeSexes = [{label: 'Masculin', value: 'M'}, {label: 'Féminin', value: 'F'}];
  selectedType: any;
  selectedDistrict = { label: 'District AB', code: "DA" };
  selectedAgentSurveillance = { label: 'Abdoulaye Gueye', code: 'ext_gueye' };
  caseStatuses: {label: string, value: string}[] = [
    {
      label: 'Non Classé',
      value: 'Non Classé'
    },
    {
      label: 'Cas Suspect',
      value: 'Cas Suspect'
    },
    {
      label: 'Cas confirmé',
      value: 'Cas confirmé'
    },
    {
      label: 'Pas un cas',
      value: 'Pas un cas'
    },
  ]
  listDistricts: {label: string, code: string}[] = [
    {
      label: 'District AB', code: 'DA'
    },
    {
      label: 'District BA', code: 'DB'
    },
    {
      label: 'District CA', code: 'DC'
    },
    {
      label: 'District DA', code: 'DD'
    },
  ];
  listSurveillanceAgent: {label: string, code: string}[] = [
    {
      label: 'Abdoulaye Gueye', code: 'ext_gueye'
    },
    {
      label: 'Aissata Dia', code: 'ext_dia'
    },
    {
      label: 'Momar Ndao', code: 'ext_ndao'
    },
    {
      label: 'Abiboulaye Dia', code: 'ext_dia1'
    },
  ]
  listSymptomes: {label: string, value: string, items?: {label: string, value: string}[]}[] = [
    {
      label: 'Général', value: 'general',
      items:[
        {
          label: 'Fièvre', value: 'Fièvre'
        },
        {
          label: 'Maux de tête', value: 'Maux de tête'
        },
        {
          label: 'Douleur Musculaire', value: 'Douleur Musculaire'
        },
      ]
    },
    {
      label: 'Respiratoire', value: 'respiratoire',
      items:[
        {
          label: 'Respiration rapide', value: 'Respiration rapide'
        }
      ]
    }
  ];

  listDiseases:{label: string, value: string}[] = [
    {
      label: 'Pneumonie',
      value: 'Pneumonie',
    },
    {
      label: 'VIH',
      value: 'VIH',
    },
    {
      label: 'COVID-19',
      value: 'COVID-19',
    },
    {
      label: 'Fièvre jaune',
      value: 'Fièvre jaune',
    },
    {
      label: 'Maladie à virus Ebola',
      value: 'Maladie à virus Ebola',
    },
    {
      label: 'Dengue',
      value: 'Dengue',
    },
    {
      label: 'Diarrhée avec / Sang (Shigella)',
      value: 'Diarrhée avec / Sang (Shigella)',
    },
    {
      label: 'Maladie à virus Ebola',
      value: 'Maladie à virus Ebola',
    },
  ];

  listQuarantaine:{label: string, value: string}[] = [
    {
      label: 'Domicile',
      value: 'Domicile',
    },
    {
      label: 'Institutionnel',
      value: 'Institutionnel',
    },
    {
      label: 'Aucun',
      value: 'Aucun',
    },
    {
      label: 'Inconnu',
      value: 'Inconnu',
    }
  ];

  listAntecedentsMedicaux:{label: string, value: string}[] = [
    {
      label: 'Tuberculose',
      value: 'Tuberculose',
    },
    {
      label: 'Défaillance cardiaque chronique',
      value: 'Défaillance cardiaque chronique',
    },
    {
      label: 'Asplénie',
      value: 'Asplénie',
    },
    {
      label: 'Hépatite',
      value: 'Hépatite',
    },
    {
      label: 'Diabète',
      value: 'Diabète',
    },
    {
      label: 'VIH',
      value: 'VIH',
    },
    {
      label: 'Syndrome de Down',
      value: 'Syndrome de Down',
    },
    {
      label: 'Défaillance cardiaque chronique',
      value: 'Défaillance cardiaque chronique',
    },
    {
      label: 'Maladie rénale',
      value: 'Maladie rénale',
    },
    {
      label: 'Asthme',
      value: 'Asthme',
    },
    {
      label: 'Drépanocytose',
      value: 'Drépanocytose',
    },
    {
      label: 'Obésité',
      value: 'Obésité',
    },
  ];
  selectedAntecedentsMedicaux: string[] = [];
  selectedSymptomes: string[] = [];
  symptomesDetails: {fieldLabel: string, fieldValue: string} [] = [];
  antecedentsMedicauxDetails: {fieldLabel: string, fieldValue: string} [] = [];
  listAnswerSymptomes: string[] = ['Oui', 'Non', 'Inconnu'];
  filteredListDistrict: {label: string, code: string}[] = []
  filteredListAgentSurveillance: {label: string, code: string}[] = []
  @Input() sampleDetails?: Sample;
  @Output() sampleDetailsChange = new EventEmitter<Sample>();
  constructor(private fb: FormBuilder){
       
  }
  ngOnInit(): void {
    console.log('sampleDetails on Case', this.sampleDetails);
    this.caseDetailsForm = this.fb.group({
      id:[this.sampleDetails?.caseDetails?.id],
      epidNumber:[this.sampleDetails?.caseDetails?.epidNumber],
      registrationDate: [this.sampleDetails?.caseDetails?.registrationDate ? new Date(this.sampleDetails?.caseDetails?.registrationDate) : undefined],
      caseInfos: this.fb.group({
        classification:[this.sampleDetails?.caseDetails?.caseInfos.classification],
        disease:[this.sampleDetails?.caseDetails?.caseInfos.disease],
        quarantaineStatus:[this.sampleDetails?.caseDetails?.caseInfos.quarantaineStatus],
        adresse:[this.sampleDetails?.caseDetails?.caseInfos.adresse],
        healthDistrict:[this.sampleDetails?.caseDetails?.caseInfos.healthDistrict],
        surveillanceAgent:[this.sampleDetails?.caseDetails?.caseInfos.surveillanceAgent || { label: 'Abdoulaye Gueye', code: 'ext_gueye' }]
      }),
      caseInvestigation: this.fb.group({
        selectedSymptomes:[this.sampleDetails?.caseDetails?.caseInvestigation?.selectedSymptomes],
        symptomesDetails: [this.sampleDetails?.caseDetails?.caseInvestigation?.symptomesDetails],
        comments:[this.sampleDetails?.caseDetails?.caseInvestigation?.comments]
      }),
      history: this.fb.group({
        selectedMedicalIssues:[this.sampleDetails?.caseDetails?.history?.selectedMedicalIssues],
        medicalIssuesDetails:[this.sampleDetails?.caseDetails?.history?.medicalIssuesDetails],
      }),
    }) 
  }
  filter(event: any) {
    const query = event?.query;
    this.filteredListDistrict = this.listDistricts.filter((elt) => elt.label.toLowerCase().indexOf(query.toLowerCase()) >= 0);
  }
  filterAgent(event: any) {
    const query = event?.query;
    this.filteredListAgentSurveillance = this.listSurveillanceAgent.filter((elt) => elt.label.toLowerCase().indexOf(query.toLowerCase()) >= 0);
  }
  setSelectedSymptomesDetails(event: any) {    
    const list: string[] = this.caseDetailsForm.get('caseInvestigation')?.get('selectedSymptomes')?.value;
    const isAdding = !!event?.originalEvent;
    console.log('list', list);
    console.log('isAdding', isAdding);
    console.log('isAdding', event);
    
    if(isAdding) {
        this.symptomesDetails = list.map((val) => {
          return {fieldLabel: val, fieldValue: 'Oui'}
        });
      
    } else {      
      this.symptomesDetails = this.symptomesDetails.filter((elt) => elt.fieldValue !== event?.itemValue)
    }    
    this.caseDetailsForm.get('caseInvestigation')?.get('symptomesDetails')?.patchValue(this.symptomesDetails);    
    this.caseDetailsForm.markAsDirty();
  }
  setListAntecedentsMedicaux(event: any) {    
    const list: string[] = this.caseDetailsForm.get('history')?.get('selectedMedicalIssues')?.value;
    const isAdding = !!event?.originalEvent;
    console.log('isAddingisAdding', isAdding);
    
    if(isAdding) {
      this.antecedentsMedicauxDetails = list.map((item) => {
        return {fieldLabel: item, fieldValue: 'Oui'}
      })
      
    } else {
      this.antecedentsMedicauxDetails = this.antecedentsMedicauxDetails.filter((elt) => elt.fieldValue !== event?.itemValue)
    }
    console.log('this.antecedentsMedicauxDetailsthis.antecedentsMedicauxDetails', this.antecedentsMedicauxDetails);
    
    this.caseDetailsForm.get('history')?.get('medicalIssuesDetails')?.patchValue(this.antecedentsMedicauxDetails);
    this.caseDetailsForm.markAsDirty();
  }

  onSubmit() {
    console.log('form', this.caseDetailsForm);

    if(this.caseDetailsForm.dirty) {
      console.log('update', this.caseDetailsForm.value);
      const caseDetails: CaseDetails = this.caseDetailsForm.getRawValue();
      if(!caseDetails.id) caseDetails.id = new Date().getTime().toString();
      if(this.sampleDetails) {
        this.sampleDetails.caseDetails = caseDetails;
        this.sampleDetailsChange.emit(this.sampleDetails)
      }
    } else {
      console.log('not dirty');
      
    }
    
  }
}
