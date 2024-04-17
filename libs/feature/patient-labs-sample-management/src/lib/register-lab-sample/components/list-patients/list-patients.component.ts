import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { PatientAddComponent } from '@ddsi-labs-apps/common-util';
import { PATIENT_ATTRIBUTE, TableColumn, NotificationSeverity } from '@ddsi-labs-apps/enums';
import { Patient } from '@ddsi-labs-apps/models';
import { NotificationService, PatientService } from '@ddsi-labs-apps/services';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { MenuModule } from 'primeng/menu';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'ddsi-labs-apps-list-patients',
  standalone: true,
  imports: [CommonModule, MenuModule,
    ConfirmPopupModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DynamicDialogModule],
    providers: [DialogService, NotificationService, ConfirmationService],
  templateUrl: './list-patients.component.html',
  styleUrl: './list-patients.component.scss',
})
export class ListPatientsComponent {
  TABLE_COLUMN = PATIENT_ATTRIBUTE;
  cols: TableColumn[] = [
    {
      field: 'id', header: 'ID'
    },
    {
      field: 'anon_name', header: "Nom d'anonymisation"
    },
    {
      field: 'first_name', header: 'Prénom'
    },
    {
      field: 'last_name', header: 'Nom'
    },
    {
      field: 'birth_date', header: 'Date de naissance'
    },
  ];
  listPatient: Patient[] = [];
  totalRecords = 0;
  loading = true;

  @ViewChild('filter') filter!: ElementRef;
  @ViewChild('dt1') table!: Table;

  constructor(
    private confirmService: ConfirmationService,
    private notificationService: NotificationService,
    public dialogService: DialogService,
    private patientService: PatientService
  ) { }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  addPatient(editMode = false, patient?: Patient) {
    const ref = this.dialogService.open(PatientAddComponent, {
      header: `${editMode ? 'Editer' : 'Ajouter'} un patient`,
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
          this.notificationService.displayNotification(NotificationSeverity.SUCCESS, `${editMode ? 'Edit' : 'Creation'} `, 'Opération effectuée avec succés');

        }
      },
    });
  }

  onDeleteItem(event: any, item: Patient) {
    this.confirmService.confirm({
      target: event.target as EventTarget,
      message: 'Êtes vous sûr de vouloir continuer ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete(item);
      },
    });
  }

  delete(item: Patient) {
    this.patientService.deletePatient(item).subscribe({
      next: (resp) => {
        this.notificationService.displayNotification(NotificationSeverity.SUCCESS, `Succés`, `Elément ${item.id} a été bien supprimé`);
        this.table.reset();
      },
    });
  }

  fetchListPatient(params: any) {
    const endpoint_params: { limit: string, page: number, search?: string } = {
      limit: params?.rows,
      page: (params?.first / params?.rows)
    };
    if (params?.globalFilter) {
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
        console.log('err', err);

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
      header: `Importer une liste de patients`,
      autoZIndex: true,
      width: '445px',
    });
    ref.onClose.subscribe({
      next: (data: { success: boolean }) => {
        if (data?.success) {
          this.table.reset();
          this.notificationService.displayNotification(NotificationSeverity.SUCCESS, `Creation`, 'Opération effectuée avec succés');
        }
      },
    });
  }
}
