import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TabViewModule } from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
@Component({
  selector: 'ddsi-labs-apps-patient-details-content',
  standalone: true,
  imports: [CommonModule,MultiSelectModule, TabViewModule, ButtonModule, InputTextModule, CalendarModule, FormsModule, DropdownModule, AutoCompleteModule, InputTextareaModule],
  templateUrl: './patient-details-content.component.html',
  styleUrl: './patient-details-content.component.scss',
})
export class PatientDetailsContentComponent {
  date = new Date();
  listeSexes = [{label: 'Masculin', value: 'M'}, {label: 'Féminin', value: 'F'}];
  selectedType: any;
  selectedDistrict = { label: 'District AB', code: "DA" };
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
  selectedSymptomes: string[] = [];
  symptomesDetails: {fieldLabel: string, fieldValue: string} [] = [];
  listAnswerSymptomes: string[] = ['Oui', 'Non', 'Inconnu'];
  filteredListDistrict: {label: string, code: string}[] = []

  filter(event: any) {
    const query = event?.query;
    this.filteredListDistrict = this.listDistricts.filter((elt) => elt.label.toLowerCase().indexOf(query.toLowerCase()) >= 0);
  }
  setSelectedSymptomes(event: any) {    
    const list: string[] = event?.value;
    const isAdding = !!event?.originalEvent;
    if(isAdding) {
      for (const item of list) {
        this.symptomesDetails.push({fieldLabel: item, fieldValue: 'Oui'})
      }
    } else {
      this.symptomesDetails = this.symptomesDetails.filter((elt) => elt.fieldValue !== event?.itemValue)
    }
  }

}
