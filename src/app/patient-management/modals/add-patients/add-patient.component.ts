import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/shared/service/patient/patient.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TabView, TabViewModule } from 'primeng/tabview';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { PATIENT_FILE_LIST_MAX_SIZE } from 'src/app/shared/util';
@Component({
  selector: 'ddsi-labs-apps-add-patient',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    CalendarModule,
    ToastModule,
    TabViewModule,
    FileUploadModule,
  ],
  providers: [MessageService],
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
})
export class AddPatientComponent {
  PATIENT_FILE_LIST_MAX_SIZE = PATIENT_FILE_LIST_MAX_SIZE;
  sexes: { label: string; value: string }[] = [
    {
      label: 'Masculin',
      value: 'M',
    },
    {
      label: 'Feminin',
      value: 'F',
    },
  ];
  formGroup: FormGroup = new FormGroup({});
  editMode = this.dynamicDialogConfig.data.editMode;
  isLoading = false;

  importedPatientsFile?: any;
  uploadingPatients = false;
  hasErrorUploadingPatients = false;
  @ViewChild('fileUploader') fileUploader!: FileUpload;
  @ViewChild('viewTab') viewTab!: TabView;
  currentIndex = 0;
  tabIndex = 0;
  constructor(
    private dynamicDialogConfig: DynamicDialogConfig,
    private fb: FormBuilder,
    private patientService: PatientService,
    private dynamicDialogRef: DynamicDialogRef,
    private messageService: MessageService
  ) {
    const patient: Patient = dynamicDialogConfig.data?.patient;
    const tabIndex: number = dynamicDialogConfig.data?.tabIndex;
    this.initializeTabs(tabIndex);
    this.formGroup = this.fb.group({
      anon_name: [patient?.anon_name || 'anon_name'],
      first_name: [patient?.first_name || null, [Validators.required]],
      last_name: [patient?.last_name || null, [Validators.required]],
      sex: [patient?.sex || null, [Validators.required]],
      birth_date: [
        patient?.birth_date ? new Date(`${patient.birth_date}`) : null,
        [Validators.required],
      ],
    });
  }


  initializeTabs(currentTabIndex: number | undefined): void {
    setTimeout(() => {
      this.currentIndex = currentTabIndex || 0;
    },100);
  }

  submit() {
    const value: Patient = this.formGroup.value;
    this.isLoading = true;
    if (this.formGroup.valid) {
      value.birth_date = new Date(value.birth_date!)
        .toISOString()
        .split('T')[0];
      if (this.editMode) {
        value.id = this.dynamicDialogConfig.data.patient?.id;

        this.patientService.updatePatient(value).subscribe({
          next: (resp: any) => {
            this.isLoading = false;
            this.onSuccess(true);
          },
          error: (err: any) => {
            this.isLoading = false;
            this.onSuccess(false);
          },
        });
      } else {
        this.patientService.createPatient(value).subscribe({
          next: (resp: any) => {
            this.isLoading = false;
            this.onSuccess(true);
          },
          error: (err: any) => {
            this.isLoading = false;
            this.onSuccess(false);
          },
        });
      }
    }
  }

  onSuccess(success: boolean) {
    if (success) {
      this.dynamicDialogRef.close({ success });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: `${this.editMode ? 'Edit' : 'Creation'} `,
        detail: 'Action is not fully effective',
      });
    }
  }

  onFileSelected(event: any) {
    const importedPatientsFile = event?.currentFiles?.length ? event?.currentFiles[0] : null;
    this.uploadingPatients = true;
    this.hasErrorUploadingPatients = false;
    this.patientService.uploadListPatientsWithFile(importedPatientsFile).subscribe({
      next:(res) => {
        this.uploadingPatients = false;
        this.displayNotificationMsg(true, 'Import', 'List of Patients successfully imported');
        this.fileUploader.clear();
        this.dynamicDialogRef.close({ success: true });
      },
      error:(err) => {
        this.uploadingPatients = false;
        this.hasErrorUploadingPatients = true;
        this.displayNotificationMsg(false, 'Failed', 'Error during import, please try again')

      }
    })
  }

  displayNotificationMsg(success: boolean, title: string, message: string) {
    this.messageService.add({ severity: success ? 'success' : 'error' , summary: title, detail: message });
  }
}
