import { Component } from '@angular/core';
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

@Component({
  selector: 'ddsi-labs-apps-case-details-content',
  standalone: true,
  imports: [CommonModule,MultiSelectModule, TabViewModule, ButtonModule, InputTextModule, CalendarModule, FormsModule, DropdownModule, AutoCompleteModule, InputTextareaModule, ReactiveFormsModule],
  templateUrl: './case-details-content.component.html',
  styleUrl: './case-details-content.component.scss',
})
export class CaseDetailsContentComponent {
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
  constructor(private fb: FormBuilder){
    this.caseDetailsForm = fb.group({
      id:[],
      epidNumber:[],
      registrationDate: [],
      caseInfos: fb.group({
        classification:[],
        disease:[],
        quarantaineStatus:[],
        adresse:[],
        healthDistrict:[],
        surveillanceAgent:[{ label: 'Abdoulaye Gueye', code: 'ext_gueye' }]
      }),
      caseInvestigation: fb.group({
        selectedSymptomes:[],
        symptomesDetails:fb.array([]),
        comments:[]
      }),
      history: fb.group({
        selectedMedicalIssues:[],
        medicalIssuesDetails:fb.array([]),
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
  setSelectedSymptomes(event: any) {    
    const list: string[] = event?.value;
    const isAdding = !!event?.originalEvent;
    if(isAdding) {
      for (const item of list) {
        this.symptomesDetails.push({fieldLabel: item, fieldValue: 'Oui'});
      }
    } else {
      this.symptomesDetails = this.symptomesDetails.filter((elt) => elt.fieldValue !== event?.itemValue)
    }
    this.caseDetailsForm.get('caseInvestigation')?.get('selectedSymptomes')?.patchValue(this.symptomesDetails);
    this.caseDetailsForm.markAsDirty();
  }
  setListAntecedentsMedicaux(event: any) {    
    const list: string[] = event?.value;
    const isAdding = !!event?.originalEvent;
    if(isAdding) {
      for (const item of list) {
        this.antecedentsMedicauxDetails.push({fieldLabel: item, fieldValue: 'Oui'})
      }
    } else {
      this.antecedentsMedicauxDetails = this.antecedentsMedicauxDetails.filter((elt) => elt.fieldValue !== event?.itemValue)
    }
    this.caseDetailsForm.get('history')?.get('selectedMedicalIssues')?.patchValue(this.antecedentsMedicauxDetails);
    this.caseDetailsForm.markAsDirty();
  }

  onSubmit() {
    console.log('form', this.caseDetailsForm);

    if(this.caseDetailsForm.dirty) {
      console.log('update');
      
    } else {
      console.log('not dirty');
      
    }
    
  }
}
