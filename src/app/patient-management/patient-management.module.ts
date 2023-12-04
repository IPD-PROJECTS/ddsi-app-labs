import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientManagementRoutingModule } from './patient-management-routing.module';
import { ListPatientsComponent } from './pages/list-patients/list-patients.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { FileUploadModule } from 'primeng/fileupload';
@NgModule({
  declarations: [ListPatientsComponent],
  imports: [
    CommonModule,
    PatientManagementRoutingModule,
    MenuModule,
    ConfirmPopupModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    DynamicDialogModule,
    FileUploadModule
  ],
})
export class PatientManagementModule {}
