import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabelType, PlateFillingType } from '@ddsi-labs-apps/enums';
import { PlateTypeModel } from '@ddsi-labs-apps/models';
import { ApplicationRoutingService, PlateTypeService } from '@ddsi-labs-apps/services';
import { MessageService } from 'primeng/api';
import { PlatePlanPreviewBlockComponent } from '@ddsi-labs-apps/common-util';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'ddsi-labs-apps-plate-type-add',
  standalone: true,
  imports: [CommonModule, FormsModule,PlatePlanPreviewBlockComponent, InputTextModule, ButtonModule, RippleModule, DropdownModule, InputSwitchModule, ReactiveFormsModule, TooltipModule, MultiSelectModule],
  templateUrl: './plate-type-add.component.html',
  styleUrls: ['./plate-type-add.component.scss'],
})
export class PlateTypeAddComponent {
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
      label: ['', Validators.required],
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
    this.createPlateTypeForm.markAllAsTouched();
    if(this.createPlateTypeForm.valid) {
      // Save Plate Type Infos through backEnd APIs
      const data: PlateTypeModel = {
        label: this.createPlateTypeForm.get('label')?.value,
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
