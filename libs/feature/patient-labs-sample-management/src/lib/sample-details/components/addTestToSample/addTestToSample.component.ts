import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DividerModule } from 'primeng/divider';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
export type resultType = 'Positif' | 'Negatif' | 'Undeterminate' | undefined;
export interface AnalysisType {
  typeTest: string | undefined;
  diseaseToTest: string | undefined;
  hasResult: boolean;
  dateResult?: string;
  resultValue?: string;
  comments?: string;
}
@Component({
  selector: 'ddsi-labs-apps-add-test-to-sample',
  standalone: true,
  imports: [
    CommonModule,
    ToggleButtonModule,
    SelectButtonModule,
    CalendarModule,
    DropdownModule,
    ButtonModule,
    FormsModule,
    InputTextareaModule,
    DividerModule,
    ReactiveFormsModule
  ],
  templateUrl: './addTestToSample.component.html',
  styleUrl: './addTestToSample.component.scss',
})
export class AddTestToSampleComponent {
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
  private dialogRef = inject(DynamicDialogRef)
  form: FormGroup;
  constructor(private fb:FormBuilder){
    this.form = fb.group({
      forms : fb.array([this.addNewAnalysisFormGroup()])
    })
  }

  get listAnalysisForm() : FormArray {
    return this.form.get('forms') as FormArray
  }
  addNewAnalyse(){
    this.listAnalysisForm?.push(this.addNewAnalysisFormGroup())
  }

  addNewAnalysisFormGroup(): FormGroup {
    return this.fb.group({
      typeTest:[undefined, [Validators.required]],
      diseaseToTest:[undefined, [Validators.required]],
      hasResult: [false],
      dateResult:[undefined],
      resultValue: [undefined],
      comments: [undefined]
    })
  }

  removeAnalysis(index: number) {
    this.listAnalysisForm.removeAt(index)
  }

  confirmSelection() {
    this.form.markAllAsTouched();
    if(this.listAnalysisForm.valid) {
      const analyseList = this.listAnalysisForm?.value as AnalysisType[] ;
      this.dialogRef.close({result: analyseList});
    }
  }
}
