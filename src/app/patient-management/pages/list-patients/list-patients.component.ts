import { Component, ElementRef, ViewChild } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { AddPatientComponent } from '../../modals/add-patients/add-patient.component';
import { PatientService } from '@ddsi-labs-apps/services';
import { ConfirmationService } from 'primeng/api';
import { Patient } from '@ddsi-labs-apps/models';
import { NotificationService } from '@ddsi-labs-apps/services';
import { NotificationSeverity, PATIENT_ATTRIBUTE } from '@ddsi-labs-apps/enums';


@Component({
  selector: 'ddsi-labs-apps-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss'],
  providers: [DialogService, NotificationService, ConfirmationService],
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
    private notificationService: NotificationService,
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
        patient,
      },
      width: '445px',
    });

    ref.onClose.subscribe({
      next: (data: { success: boolean }) => {
        if (data?.success) {
          this.table.reset();
          this.notificationService.displayNotification(NotificationSeverity.SUCCESS, `${editMode ? 'Edit' : 'Creation'} `, 'Action is fully effective');

        }
      },
    });
  }

  onDeleteItem(event: any, item: Patient) {
    this.confirmService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete(item);
      },
    });
  }

  delete(item: Patient) {
    this.patientService.deletePatient(item).subscribe({
      next: (resp) => {
        this.notificationService.displayNotification(NotificationSeverity.SUCCESS, `Success`, `Item ${item.id} Deleted`);
        this.table.reset();
      },
    });
  }

  fetchListPatient(params: any) {
    const endpoint_params = {
      limit: params?.rows,
      page: params?.first / params?.rows,
    };
    this.loading = true;
    this.patientService.getListPatients(endpoint_params).subscribe({
      next: (resp: { count: number; results: any[] }) => {
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

  opentModalImport() {
    const ref = this.dialogService.open(AddPatientComponent, {
      data: {
        tabIndex: 1,
      },
      header: `Import list of Patients`,
      autoZIndex: true,
      width: '445px',
    });
    ref.onClose.subscribe({
      next: (data: { success: boolean }) => {
        if (data?.success) {
          this.table.reset();
          this.notificationService.displayNotification(NotificationSeverity.SUCCESS, `Creation`, 'Action is fully effective' );
        }
      },
    });
  }
}
