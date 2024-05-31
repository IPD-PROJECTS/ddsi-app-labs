import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AnalysisType, resultType } from '../addTestToSample/addTestToSample.component';

@Component({
  selector: 'ddsi-labs-apps-edit-sample-analysis',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, SelectButtonModule, InputTextareaModule, CalendarModule, ToggleButtonModule, DropdownModule],
  templateUrl: './editSampleAnalysis.component.html',
  styleUrl: './editSampleAnalysis.component.scss',
})
export class EditSampleAnalysisComponent {
  resultOptionsType: { label: string; value: resultType }[] = [
    { label: 'Positif', value: 'Positif' },
    { label: 'Negatif', value: 'Negatif' },
    { label: 'Indéterminé', value: 'Undeterminate' },
  ];
  result: resultType;
  listeTypeTest: { label: string; value: string }[] = [
    {
      label: 'Seuronetralisation',
      value: 'Seuronetralisation',
    },
    {
      label: "Détection d'anticorps",
      value: "Détection d'anticorps",
    },
    {
      label: "Test d'agglutination au latex",
      value: "Test d'agglutination au latex",
    },
    {
      label: "Anticorps du sérum d'IgG",
      value: "Anticorps du sérum d'IgG",
    },
    {
      label: "Test de détection d'antigène (test rapide)",
      value: "Test de détection d'antigène (test rapide)",
    },
  ];
  listePathogene: { label: string; value: string }[] = [
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
  form: FormGroup = new FormGroup({});
  sampleAnalysis?: AnalysisType;
  index?: number;
  constructor(private fb: FormBuilder, private config: DynamicDialogConfig, private ref: DynamicDialogRef){
    this.sampleAnalysis = config.data.sampleAnalysis;
    this.form = this.fb.group({
      typeTest:[this.sampleAnalysis?.typeTest, [Validators.required]],
      diseaseToTest:[this.sampleAnalysis?.diseaseToTest, [Validators.required]],
      hasResult: [this.sampleAnalysis?.hasResult || false],
      dateResult:[this.sampleAnalysis?.dateResult],
      resultValue: [this.sampleAnalysis?.resultValue],
      comments: [this.sampleAnalysis?.comments]
    })
  }

  finishEdit() {
    this.form.markAllAsTouched();
    if(this.form.valid) {
      
      const update = this.form.value;
      console.log('update', update);
      this.ref.close({result: update, index: this.config.data?.index})
    }
  }
}
