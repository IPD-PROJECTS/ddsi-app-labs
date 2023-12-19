import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PLATE_PLAN_FILE_MAX_SIZE } from '@ddsi-labs-apps/common-util';
import { PlateModel } from '@ddsi-labs-apps/models';
import { PlatePlanService } from '@ddsi-labs-apps/services';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'ddsi-labs-apps-import-plate-analysis-result',
  standalone: true,
  imports: [CommonModule, FileUploadModule],
  templateUrl: './import-plate-analysis-result.component.html',
  styleUrls: ['./import-plate-analysis-result.component.scss'],
})
export class ImportPlateAnalysisResultComponent {
  PLATE_PLAN_FILE_MAX_SIZE = PLATE_PLAN_FILE_MAX_SIZE;
  uploadingFile = false;
  hasErrorUploading = false;
  constructor(private platePlanService: PlatePlanService, private conf: DynamicDialogConfig, private dialogRef: DynamicDialogRef){}

  onFileSelected(event: any) {
    const plateInfos: PlateModel = this.conf.data.plaqueInfos;
    const file = event?.currentFiles?.length ? event?.currentFiles[0] : null;
    if(file && plateInfos.id) {
      this.hasErrorUploading = false;
      this.uploadingFile = true;
      this.platePlanService.uploadRoboAnalysisResult(plateInfos.id, file).subscribe({
          next:(res: PlateModel) => {
            this.hasErrorUploading = false;
            this.uploadingFile = false;

            this.dialogRef.close({success: true, data: res});
          },
          error: () => {
            this.uploadingFile = false;
            this.hasErrorUploading = true;
          }
      })
    }
  }
}
