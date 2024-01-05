import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { MenuModule } from 'primeng/menu';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { NotificationService, PatientService } from '@ddsi-labs-apps/services';
import { ConfirmationService } from 'primeng/api';
import { NotificationSeverity, PATIENT_ATTRIBUTE, TableColumn } from '@ddsi-labs-apps/enums';
import { Patient } from '@ddsi-labs-apps/models';
import { PatientAddComponent } from '../patient-add/patient-add.component';
@Component({
  selector: 'ddsi-labs-apps-patients-list',
  standalone: true,
  imports: [
    CommonModule,
    MenuModule,
    ConfirmPopupModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DynamicDialogModule,
  ],
  providers: [DialogService, NotificationService, ConfirmationService],
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss'],
})
export class PatientsListComponent {
  TABLE_COLUMN = PATIENT_ATTRIBUTE;
  cols: TableColumn[] = [
    {
      field: 'id', header: 'ID'
    },
    {
      field: 'anon_name', header: 'Anon Name'
    },
    {
      field: 'first_name', header: 'Firstname'
    },
    {
      field: 'last_name', header: 'Lastname'
    },
    {
      field: 'birth_date', header: 'Birthdate'
    },
  ];
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
    const ref = this.dialogService.open(PatientAddComponent, {
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
    const endpoint_params: {limit: string, page: number, search?: string} = {
      limit: params?.rows,
      page: (params?.first / params?.rows)
    };
    if(params?.globalFilter) {
      endpoint_params['search'] = params.globalFilter;
    }

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
    const ref = this.dialogService.open(PatientAddComponent, {
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
