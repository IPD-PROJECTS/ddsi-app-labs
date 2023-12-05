import { Component, OnDestroy, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitterModule } from 'primeng/splitter';
import { AccordionModule } from 'primeng/accordion';
import { PlatePlanPreviewBlockComponent } from 'src/app/shared/components/plate-plan-preview-block/plate-plan-preview-block.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PlatePlanService } from 'src/app/shared/service/plate-plan/plate-plan.service';
import { PlateModel } from 'src/app/models/plate.model';
import { ActivatedRoute } from '@angular/router';
import { ApplicationRoutingService } from 'src/app/shared/application-routing/application-routing.service';
import _ from 'lodash';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { PLATE_PLAN_FILE_MAX_SIZE } from 'src/app/shared/util';

export const plateDetailsSignal = signal(<PlateModel | undefined>undefined, {equal: _.isEqual});
@Component({
  selector: 'ddsi-labs-apps-create-plate-plan',
  standalone: true,
  imports: [CommonModule, SplitterModule, AccordionModule, PlatePlanPreviewBlockComponent, ReactiveFormsModule, ButtonModule, InputTextModule, ToastModule, FileUploadModule],
  templateUrl: './create-plate-plan.component.html',
  styleUrls: ['./create-plate-plan.component.scss'],
})
export class CreatePlatePlanComponent implements OnDestroy {
  PLATE_PLAN_FILE_MAX_SIZE = PLATE_PLAN_FILE_MAX_SIZE;
  plateFormGroup: FormGroup = new FormGroup({});
  isSubmittingInitalization = false;
  currentStepIndex = 0;
  plaqueInfos?: PlateModel;
  plaqueInitializedInfos?: PlateModel;
  idPlate?: number;
  isSubmittingPlatePlan = false;
  hasPlateDetailsChanged = false;
  constructor(private fb: FormBuilder, private plateService: PlatePlanService, private route: ActivatedRoute, private appRouting: ApplicationRoutingService){
    this.route.data.subscribe(({ plateDetails }) => {
      this.initializePlateData(plateDetails);
      if(this.plaqueInfos) {
        this.currentStepIndex = 1;
        plateDetailsSignal.set(this.plaqueInfos)
      }
      });
      this.initializeForm();




    effect(() => {
      console.log(`The plateDetailsSignal signal is:`, plateDetailsSignal());
      console.log(`The plateDetailsSignal signal has changed`);
      if(plateDetailsSignal()) {
        this.plaqueInfos = {...plateDetailsSignal()};
        this.hasPlateDetailsChanged = this.checkIfPlateHasChanged();
        this.initializeForm();
      }
    })
  }
  ngOnDestroy(): void {
    plateDetailsSignal.set(undefined);
  }

  initializePlateData(data: any) {
    this.plaqueInfos = data;
    this.plaqueInitializedInfos = this.plaqueInfos;
  }

  initializeForm() {
    this.plateFormGroup = this.fb.group({
      id: [this.plaqueInfos?.id],
      description: [this.plaqueInfos?.description,[Validators.required]]
    });
  }

  initializePlate() {
    this.plateFormGroup.markAllAsTouched();
    if(this.plateFormGroup.valid) {
      this.isSubmittingInitalization = true;
      const value: PlateModel = this.plateFormGroup.value;
      if(!value.id) {
        this.plateService.createPlate(value).subscribe({
          next:(resp: PlateModel) => {
            this.currentStepIndex = 1;
            this.isSubmittingInitalization = false;
            this.plaqueInfos = resp;
            this.plateFormGroup.reset(resp);
            plateDetailsSignal.set(this.plaqueInfos);

          },
          error:(err: any) => {
            this.isSubmittingInitalization = false;

          }
        })
      } else {
        this.plateService.updatePlate(value).subscribe({
          next:(resp: PlateModel) => {
            this.currentStepIndex = 1;
            this.isSubmittingInitalization = false;
            this.plaqueInfos = resp;
            this.plateFormGroup.reset(resp);
            plateDetailsSignal.set(this.plaqueInfos);

          },
          error:(err: any) => {
            this.isSubmittingInitalization = false;
            console.log('err', err);

          }
        })
      }
    }
  }

  goBack() {
    this.appRouting.goToListPlatePlanPage();
  }

  savePlatePlan() {
    console.log('plaqueInfos', this.plaqueInfos);
    this.isSubmittingPlatePlan = true;
    this.plateService.fillPlateWithItems(this.plaqueInfos?.id!, this.plaqueInfos!).subscribe({
      next:(res: any) => {
        console.log('res', res);
        this.isSubmittingPlatePlan = false;
      },
      error: (err) => {
        console.log('err', err);
        this.isSubmittingPlatePlan = false;

      }
    })
  }

  checkIfPlateHasChanged() {
    return !_.isEqual(this.plaqueInitializedInfos, this.plaqueInfos);
  }

  onFileSelected(event:any) {}
}
