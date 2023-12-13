import { Component, OnDestroy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitterModule } from 'primeng/splitter';
import { AccordionModule } from 'primeng/accordion';
import { PlatePlanPreviewBlockComponent } from 'src/app/shared/components/plate-plan-preview-block/plate-plan-preview-block.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PlatePlanService } from 'src/app/shared/service/plate-plan/plate-plan.service';
import { PlateModel, plateDetailsSignal } from '@ddsi-labs-apps/models';
import { ActivatedRoute } from '@angular/router';
import _ from 'lodash';
import { FileUploadModule } from 'primeng/fileupload';
import { PLATE_PLAN_FILE_MAX_SIZE } from 'src/app/shared/util';
import { MessageService } from 'primeng/api';
import { NotificationService } from 'src/app/shared/service/notification/notification.service';
import { ApplicationRoutingService } from 'src/app/shared/service/application-routing/application-routing.service';
import { NotificationSeverity } from '@ddsi-labs-apps/enums';


@Component({
  selector: 'ddsi-labs-apps-create-plate-plan',
  standalone: true,
  imports: [CommonModule, SplitterModule, AccordionModule, PlatePlanPreviewBlockComponent, ReactiveFormsModule, ButtonModule, InputTextModule, FileUploadModule],
  providers:[MessageService, NotificationService],
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
  constructor(private notificationService: NotificationService, private fb: FormBuilder, private plateService: PlatePlanService, private route: ActivatedRoute, private appRouting: ApplicationRoutingService){
    this.route.data.subscribe(({ plateDetails }) => {
      this.initializePlateData(plateDetails);
      if(this.plaqueInfos) {
        this.currentStepIndex = 1;
        plateDetailsSignal.set(this.plaqueInfos)
      }
      });
      this.initializeForm();




    effect(() => {
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
        this.notificationService.displayNotification(NotificationSeverity.SUCCESS, 'Success', 'Plate plan updated successfully');
        this.plaqueInitializedInfos = this.plaqueInfos;
        this.hasPlateDetailsChanged = false;
      },
      error: (err) => {
        console.log('err', err);
        this.isSubmittingPlatePlan = false;
        this.notificationService.displayNotification(NotificationSeverity.ERROR, 'Success', 'Plate plan updated successfully')


      }
    })
  }

  checkIfPlateHasChanged() {
    return !_.isEqual(this.plaqueInitializedInfos, this.plaqueInfos);
  }

  onFileSelected(event:any) {}
}
