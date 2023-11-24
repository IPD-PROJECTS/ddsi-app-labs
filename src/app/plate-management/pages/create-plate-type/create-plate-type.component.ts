import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { NextCaracterPipe } from 'src/app/pipes/nextCaracter/nextCaracter.pipe';
import { TooltipModule } from 'primeng/tooltip';
import { MultiSelectModule } from 'primeng/multiselect';
import { GetListPlatePositionPipe } from 'src/app/pipes/getListPlatePostion/getListPlatePosition.pipe';
import { GetLabelOfPlateItemPipe } from 'src/app/pipes/getLabelOfPlateItem/getLabelOfPlateItem.pipe';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ApplicationRoutingService } from 'src/app/shared/application-routing/application-routing.service';
interface Product {
  name: string;
  price: string;
  code: string;
  sku: string;
  status: string;
  tags: string[];
  category: string;
  colors: string[];
  stock: string;
  inStock: boolean;
  description: string;
  images: Image[];
}

interface Image {
  name: string;
  objectURL: string;
}

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
  constructor(private fb: FormBuilder, private messageService: MessageService, private appRouting: ApplicationRoutingService) {
    this.createPlateTypeForm = fb.group({
      name: ['', Validators.required],
      plateFillingType: [null, Validators.required],
      rowLength: [8, [Validators.required, Validators.min(2), Validators.max(20)]],
      colLength: [12, [Validators.required, Validators.min(2), Validators.max(20)]],
      rowLabelType: ['Letter', [Validators.required]],
      colLabelType: ['Number', [Validators.required]],
      numberOfWhiteCtrl: [1, [Validators.required, Validators.min(1)]],
      positionsOfWhiteCtrl: [null, [Validators.required]],
      numberOfNegCtrl: [1, [Validators.required]],
      positionsOfNegCtrl: [null, [Validators.required]],
      numberOfPositiveCtrl: [1, [Validators.required]],
      positionsOfPositiveCtrl: [null, [Validators.required]]
    })
  }



  onPlateInfosSubmitted() {
    console.log('form', this.createPlateTypeForm.value);
    this.createPlateTypeForm.markAllAsTouched();
    if(this.createPlateTypeForm.valid) {
      // Save Plate Type Infos through backEnd APIs
      this.displayNotificationMsg('Plate successfully registered', true, 'Success');
      this.createPlateTypeForm.disable();
      this.reRouteToListPage();
    } else {
      this.displayNotificationMsg('Please fill the form correctly', false, 'Error');
    }
  }

  displayNotificationMsg(msg: string, isSuccess: boolean, title = '') {
    this.messageService.add({ severity: isSuccess ? 'success' : 'error', summary: title, detail: msg });
  }

  reRouteToListPage() {
    setTimeout(() => {
      this.appRouting.goToListPlateTypePage();
    }, 2500);
  }
}
