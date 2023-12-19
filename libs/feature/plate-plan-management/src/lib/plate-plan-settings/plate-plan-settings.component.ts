import { Component, OnDestroy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitterModule } from 'primeng/splitter';
import { AccordionModule } from 'primeng/accordion';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { NotificationSeverity, Plate_Settings_Step } from '@ddsi-labs-apps/enums';
import { PlateModel, plateDetailsSignal } from '@ddsi-labs-apps/models';
import { ActivatedRoute } from '@angular/router';
import { PlatePlanPreviewBlockComponent } from '@ddsi-labs-apps/common-util';
import { NotificationService, PlatePlanService, ApplicationRoutingService } from '@ddsi-labs-apps/services';
import * as _ from 'lodash';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ImportPlatePlanComponent } from '../import-plate-plan/import-plate-plan.component';
import { ImportPlateAnalysisResultComponent } from '../import-plate-analysis-result/import-plate-analysis-result.component';


@Component({
  selector: 'ddsi-labs-apps-plate-plan-settings',
  standalone: true,
  imports: [CommonModule, SplitterModule, AccordionModule, PlatePlanPreviewBlockComponent, ReactiveFormsModule, ButtonModule, InputTextModule, FileUploadModule],
  providers:[MessageService, DialogService, NotificationService],
  templateUrl: './plate-plan-settings.component.html',
  styleUrls: ['./plate-plan-settings.component.scss'],
})
export class PlatePlanSettingsComponent implements OnDestroy {
  plateFormGroup: FormGroup = new FormGroup({});
  isSubmittingInitalization = false;
  currentStepIndex = 0;
  plaqueInfos?: PlateModel;
  plaqueInitializedInfos?: PlateModel;
  idPlate?: number;
  isSubmittingPlatePlan = false;
  hasPlateDetailsChanged = false;
  constructor(private dialogService: DialogService, private notificationService: NotificationService, private fb: FormBuilder, private plateService: PlatePlanService, private route: ActivatedRoute, private appRouting: ApplicationRoutingService){
    this.route.data.subscribe(({ plateDetails }) => {
      this.initializePlateData(plateDetails);
      if(this.plaqueInfos) {
        this.goToStep(Plate_Settings_Step.FILL_PLATE);
        if(this.plaqueInfos.patients?.length) {
          this.goToStep(Plate_Settings_Step.IMPORT_RESULT);
        }
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
      description: [this.plaqueInfos?.description,[Validators.required]],
      // created_by: [this.plaqueInfos?.created_by,[Validators.required]]
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
            this.isSubmittingInitalization = false;
            this.plaqueInfos = resp;
            this.plateFormGroup.reset(resp);
            this.notificationService.displayNotification(NotificationSeverity.SUCCESS, 'Initialization', 'Plate infos initialized successfully')
            plateDetailsSignal.set(this.plaqueInfos);
            this.goToStep(Plate_Settings_Step.FILL_PLATE);

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
            this.notificationService.displayNotification(NotificationSeverity.SUCCESS, 'Update', 'Plate infos updated successfully')
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
    if(this.plaqueInfos?.id) {
      this.isSubmittingPlatePlan = true;
      this.plateService.fillPlateWithItems(this.plaqueInfos?.id, this.plaqueInfos).subscribe({
        next:() => {
          this.isSubmittingPlatePlan = false;
          this.notificationService.displayNotification(NotificationSeverity.SUCCESS, 'Success', 'Plate plan updated successfully');
          this.plaqueInitializedInfos = this.plaqueInfos;
          plateDetailsSignal.set(this.plaqueInfos);
          this.goToStep(Plate_Settings_Step.IMPORT_RESULT);
        },
        error: () => {
          this.isSubmittingPlatePlan = false;
          this.notificationService.displayNotification(NotificationSeverity.ERROR, 'Success', 'Plate plan updated successfully')
        }
      })
    }
  }

  goToStep(step: Plate_Settings_Step) {
    switch (step) {
      case Plate_Settings_Step.INIT:
        this.currentStepIndex = 0;
        break;
      case Plate_Settings_Step.FILL_PLATE:
        this.currentStepIndex = 1;
        break;
      case Plate_Settings_Step.IMPORT_RESULT:
        this.currentStepIndex = 2;
        break;
      default:
        break;
    }
  }

  checkIfPlateHasChanged() {
    return !_.isEqual(this.plaqueInitializedInfos, this.plaqueInfos);
  }

  opentModalImportPlatePlan() {
    const ref = this.dialogService.open(ImportPlatePlanComponent, {
      data: {
        plaqueInfos: this.plaqueInfos
      },
      header: `Import Plate plan`,
      autoZIndex: true,
      width: '445px',
    });
    ref.onClose.subscribe({
      next: (resp: { success: boolean, data: PlateModel }) => {
        if (resp?.success) {
          this.plaqueInitializedInfos = resp.data;
          plateDetailsSignal.set(resp.data);
          this.notificationService.displayNotification(NotificationSeverity.SUCCESS, `Plate Plan`, 'Plate plan updated successfully' );
        }
      },
    });
  }

  openModalImportAnalysisResult() {
    const ref = this.dialogService.open(ImportPlateAnalysisResultComponent, {
      data: {
        plaqueInfos: this.plaqueInfos
      },
      header: `Import Analysis Result`,
      autoZIndex: true,
      width: '445px',
    });

    ref.onClose.subscribe({
      next:( res: {success: boolean, data: PlateModel} ) => {
        if(res?.success) {
          this.plaqueInitializedInfos = res.data;
          plateDetailsSignal.set(res.data);
          this.notificationService.displayNotification(NotificationSeverity.INFO, 'Result analysis file', "Upload successed. Please wait we're processing the results ")
        }
      }
    })
  }
}
