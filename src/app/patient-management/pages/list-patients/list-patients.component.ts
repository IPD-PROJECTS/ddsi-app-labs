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
  FIRSTNAME = 'firstname',
  LASTNAME = 'lastname',
  BIRTHDATE = 'birthdate',
}

@Component({
  selector: 'ddsi-labs-apps-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService],
})
export class ListPatientsComponent implements OnInit {
  TABLE_COLUMN = PATIENT_ATTRIBUTE;
  listPatient: Patient[] = [];

  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;
  @ViewChild('dt1') table!: Table;

  constructor(
    private confirmService: ConfirmationService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    public dialogService: DialogService,
    private router: Router,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.fetchListPatient();
    console.log(
      'this.router.getCurrentNavigation()',
      this.router.getCurrentNavigation()
    );
    console.log('this.route', this.route);
  }
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
          this.fetchListPatient();
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
        this.fetchListPatient();
      }
    })
  }

  fetchListPatient() {
    this.loading = true;
    this.patientService.getListPatients().subscribe({
      next: (resp) => {
        this.loading = false;
        this.listPatient = resp;
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
