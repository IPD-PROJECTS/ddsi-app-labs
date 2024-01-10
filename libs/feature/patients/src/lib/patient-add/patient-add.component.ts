import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import {  TabViewModule } from 'primeng/tabview';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { Patient } from '@ddsi-labs-apps/models';
import { PatientService } from '@ddsi-labs-apps/services';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PATIENT_FILE_LIST_MAX_SIZE } from '@ddsi-labs-apps/common-util'
@Component({
  selector: 'ddsi-labs-apps-patient-add',
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
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.scss'],
})
export class PatientAddComponent {
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
  hasError = false;
  errorMsg?: string;
  @ViewChild('fileUploader') fileUploader!: FileUpload;
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
    this.tabIndex = dynamicDialogConfig.data?.tabIndex ?? 0;
    this.formGroup = this.fb.group({
      anon_name: [patient?.anon_name, [Validators.required]],
      first_name: [patient?.first_name || null, [Validators.required]],
      last_name: [patient?.last_name || null, [Validators.required]],
      sex: [patient?.sex || null, [Validators.required]],
      birth_date: [
        patient?.birth_date ? new Date(`${patient.birth_date}`) : null,
        [Validators.required],
      ],
    });
  }

  submit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const value: Patient = this.formGroup.value;
      this.isLoading = true;
      value.birth_date = new Date(value.birth_date!)
        .toISOString()
        .split('T')[0];
      if (this.editMode) {
        value.id = this.dynamicDialogConfig.data.patient?.id;

        this.patientService.updatePatient(value).subscribe({
          next: () => {
            this.isLoading = false;
            this.onSuccess(true);
          },
          error: () => {
            this.isLoading = false;
            this.onSuccess(false);
          },
        });
      } else {
        this.patientService.createPatient(value).subscribe({
          next: () => {
            this.isLoading = false;
            this.onSuccess(true);
          },
          error: (err: any) => {
            this.isLoading = false;
            this.onSuccess(false);
            this.errorMsg = err?.error['error'];
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
    this.hasError = false;
    this.patientService.uploadListPatientsWithFile(importedPatientsFile).subscribe({
      next:() => {
        this.uploadingPatients = false;
        // this.displayNotificationMsg(true, 'Import', 'List of Patients successfully imported');
        this.fileUploader.clear();
        this.dynamicDialogRef.close({ success: true });
      },
      error:(err: any) => {
        this.uploadingPatients = false;
        this.hasError = true;
        this.errorMsg = err?.error['error'];
        this.displayNotificationMsg(false, 'Failed', 'Error during import, please try again')

      }
    })
  }

  displayNotificationMsg(success: boolean, title: string, message: string) {
    this.messageService.add({ severity: success ? 'success' : 'error' , summary: title, detail: message });
  }
}
