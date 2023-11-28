import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { NextCaracterPipe } from 'src/app/shared/pipes/nextCaracter/nextCaracter.pipe';
import { TooltipModule } from 'primeng/tooltip';
import { MultiSelectModule } from 'primeng/multiselect';
import { GetListPlatePositionPipe } from 'src/app/shared/pipes/getListPlatePostion/getListPlatePosition.pipe';
import { GetLabelOfPlateItemPipe } from 'src/app/shared/pipes/getLabelOfPlateItem/getLabelOfPlateItem.pipe';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ApplicationRoutingService } from 'src/app/shared/application-routing/application-routing.service';
import { PlateTypeService } from 'src/app/shared/service/plate-type/plate-type.service';
import { PlateTypeModel } from 'src/app/models/plate-type.model';

export enum LabelType {
  LETTER = 'Letter',
  NUMBER = 'Number'
}
export enum PlateFillingType {
  COLUMN = 'Column',
  ROW = 'Row'
}

@Component({
  selector: 'ddsi-labs-apps-create-plate-type',
  standalone: true,
  imports: [CommonModule, ToastModule,FormsModule,GetLabelOfPlateItemPipe,NextCaracterPipe,GetListPlatePositionPipe, InputTextModule, ButtonModule, RippleModule, DropdownModule, InputSwitchModule, ReactiveFormsModule, TooltipModule, MultiSelectModule],
  providers:[MessageService, NextCaracterPipe],
  templateUrl: './create-plate-type.component.html',
  styleUrls: ['./create-plate-type.component.scss'],
})
export class CreatePlateTypeComponent {
  createPlateTypeForm: FormGroup = new FormGroup({});
  enumLabelType = LabelType;
  anotationLabelType = [
    {
    value: 'Letter',
    label: 'Letter'
  },
    {
    value: 'Number',
    label: 'Number'
  }

]
  plateFillType = [
    {
    value: PlateFillingType.COLUMN,
    label: 'Column by Column'
  },
    {
    value: PlateFillingType.ROW,
    label: 'Row by Row'
  }
]
isSubmitting = false;
  constructor(private fb: FormBuilder, private messageService: MessageService, private appRouting: ApplicationRoutingService, private plateTypeService: PlateTypeService) {
    this.createPlateTypeForm = fb.group({
      name: ['', Validators.required],
      plateFillingType: [null, Validators.required],
      rowLength: [8, [Validators.required, Validators.min(2), Validators.max(20)]],
      colLength: [12, [Validators.required, Validators.min(2), Validators.max(20)]],
      rowLabelType: ['Letter', [Validators.required]],
      colLabelType: ['Number', [Validators.required]],
      numberOfWhiteCtrl: [1, [Validators.min(1)]],
      positionsOfWhiteCtrl: [null, []],
      numberOfNegCtrl: [1, []],
      positionsOfNegCtrl: [null, []],
      numberOfPositiveCtrl: [1, []],
      positionsOfPositiveCtrl: [null, []]
    })
  }



  onPlateInfosSubmitted() {
    console.log('form', this.createPlateTypeForm.value);
    this.createPlateTypeForm.markAllAsTouched();
    if(this.createPlateTypeForm.valid) {
      // Save Plate Type Infos through backEnd APIs
      const data: PlateTypeModel = {
        number_rows: this.createPlateTypeForm.get('rowLength')?.value,
        number_cols: this.createPlateTypeForm.get('colLength')?.value,
      };
      this.isSubmitting = true;
      this.plateTypeService.createPlateType(data).subscribe({
        next:(resp) => {
          this.isSubmitting = false;
          this.displayNotificationMsg('Plate successfully registered', true, 'Success');
          this.createPlateTypeForm.disable();
          this.reRouteToListPage();
        },
        error:(err) => {
          this.isSubmitting = false;
        }
      })
    } else {
      this.displayNotificationMsg('Please fill the form correctly', false, 'Error');
    }
  }

  displayNotificationMsg(msg: string, isSuccess: boolean, title = '') {
    this.messageService.add({ severity: isSuccess ? 'success' : 'error', summary: title, detail: msg });
  }

  reRouteToListPage() {
    setTimeout(() => {
      this.goToListPage()
    }, 1000);
  }

  goToListPage() {
    this.appRouting.goToListPlateTypePage();
  }
}
