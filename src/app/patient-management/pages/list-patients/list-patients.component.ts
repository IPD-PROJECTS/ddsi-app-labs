import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { Patient } from 'src/app/models/patient.model';
import { AddPatientComponent } from '../../modals/add-patients/add-patient.component';
import { PatientService } from 'src/app/shared/service/patient/patient.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
enum PATIENT_ATTRIBUTE {
  ANON_NAME = 'anon_name',
  FIRSTNAME = 'first_name',
  LASTNAME = 'last_name',
  BIRTHDATE = 'birth_date',
}

@Component({
  selector: 'ddsi-labs-apps-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService],
})
export class ListPatientsComponent {
  TABLE_COLUMN = PATIENT_ATTRIBUTE;
  listPatient: Patient[] = [];
  totalRecords = 0;
  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;
  @ViewChild('dt1') table!: Table;

  constructor(
    private confirmService: ConfirmationService,
    private messageService: MessageService,
    public dialogService: DialogService,
    private patientService: PatientService
  ) {}

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  addPatient(editMode: boolean = false, patient?: Patient) {
    const ref = this.dialogService.open(AddPatientComponent, {
      header: `${editMode ? 'Edit' : 'Add'} Patient`,
      autoZIndex: true,
      data: {
        editMode,
        patient
      },
      width: '420px',
    });

    ref.onClose.subscribe({
      next:(data: {success: boolean}) => {
        if(data.success) {
          this.table.reset();
          this.messageService.add({ severity: 'success' , summary: `${editMode ? 'Edit' : 'Creation'} `, detail: 'Action is fully effective' });
        }
      }
    })
  }

  onDeleteItem(event: any,item: Patient) {
    this.confirmService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.delete(item);
      }
  });
  }

  delete(item: Patient) {
    this.patientService.deletePatient(item).subscribe({
      next:(resp) => {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: `Item ${item.id} Deleted` });
        this.table.reset();
      }
    })
  }

  fetchListPatient(params: any) {
    const endpoint_params = {
      limit: params?.rows,
      page: (params?.first / params?.rows)
    }
    this.loading = true;
    this.patientService.getListPatients(endpoint_params).subscribe({
      next: (resp: { count: number, results: any[]}) => {
        this.loading = false;
        this.totalRecords = resp.count;
        this.listPatient = resp.results;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }

  onEditItem(item: Patient) {
    const editMode = true;
    this.addPatient(editMode, item);
  }
}
