import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { PLATE_PLAN_FILE_MAX_SIZE } from '@ddsi-labs-apps/common-util';
import { PlatePlanService } from '@ddsi-labs-apps/services';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PlateModel } from '@ddsi-labs-apps/models';

@Component({
  selector: 'ddsi-labs-apps-import-plate-plan',
  standalone: true,
  imports: [CommonModule, FileUploadModule, ButtonModule],
  providers:[],
  templateUrl: './import-plate-plan.component.html',
  styleUrls: ['./import-plate-plan.component.scss'],
})
export class ImportPlatePlanComponent {
  PLATE_PLAN_FILE_MAX_SIZE = PLATE_PLAN_FILE_MAX_SIZE;
  uploadingFile = false;
  hasErrorUploading = false;
  errorMsg?:string;
  constructor(private platePlanService: PlatePlanService, private conf: DynamicDialogConfig, private dialogRef: DynamicDialogRef){}

  onFileSelected(event: any) {
    const plateInfos: PlateModel = this.conf.data.plaqueInfos;
    const file = event?.currentFiles?.length ? event?.currentFiles[0] : null;
    if(file && plateInfos.id) {
      this.hasErrorUploading = false;
      this.uploadingFile = true;
      this.platePlanService.uploadPlatePlan(plateInfos.id, file).subscribe({
          next:(res: PlateModel) => {
            this.hasErrorUploading = false;
            this.uploadingFile = false;
            this.dialogRef.close({success: true, data: res});
          },
          error: (err: any) => {
            this.uploadingFile = false;
            this.hasErrorUploading = true;
            this.errorMsg = err.error['error'];
          }
      })
    }
  }
}
