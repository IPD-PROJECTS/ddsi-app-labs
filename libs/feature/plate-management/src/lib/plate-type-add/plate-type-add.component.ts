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
import { ActivatedRoute } from '@angular/router';
import { PlateTypeDetailResolve } from '../plate-type-details.resolver';

@Component({
  selector: 'ddsi-labs-apps-plate-type-add',
  standalone: true,
  imports: [CommonModule, FormsModule,PlatePlanPreviewBlockComponent, InputTextModule, ButtonModule, RippleModule, DropdownModule, InputSwitchModule, ReactiveFormsModule, TooltipModule, MultiSelectModule],
  providers:[MessageService, PlateTypeDetailResolve],
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
  constructor(private fb: FormBuilder, private messageService: MessageService, private appRouting: ApplicationRoutingService, private plateTypeService: PlateTypeService, private route: ActivatedRoute) {
    this.createPlateTypeForm = fb.group({
      id: [],
      label: ['', Validators.required],
      plateFillingType: [null],
      number_rows: [8, [Validators.required, Validators.min(2), Validators.max(20)]],
      number_cols: [12, [Validators.required, Validators.min(1), Validators.max(20)]],
      rowLabelType: ['Letter'],
      colLabelType: ['Number'],
      numberOfWhiteCtrl: [1, [Validators.min(1)]]
    });

    this.route.data.subscribe(({ plateTypeDetails }) => {
      if(plateTypeDetails) this.updateForm(plateTypeDetails);
    });
  }
  
  updateForm(data?: PlateTypeModel) {
      this.createPlateTypeForm.reset({...data, rowLabelType: 'Letter', colLabelType: 'Number'} )
  }



  onPlateInfosSubmitted() {
    this.createPlateTypeForm.markAllAsTouched();    
    if(this.createPlateTypeForm.valid) {
      // Save Plate Type Infos through backEnd APIs
      const data: PlateTypeModel = {
        id: this.createPlateTypeForm.value?.id || undefined,
        label: this.createPlateTypeForm.get('label')?.value,
        number_rows: this.createPlateTypeForm.get('number_rows')?.value,
        number_cols: this.createPlateTypeForm.get('number_cols')?.value,
      };
      this.isSubmitting = true;
      this.plateTypeService.createPlateType(data).subscribe({
        next:() => {
          this.isSubmitting = false;
          this.displayNotificationMsg('Plate successfully registered', true, 'Success');
          this.createPlateTypeForm.disable();
          this.reRouteToListPage();
        },
        error:() => {
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
