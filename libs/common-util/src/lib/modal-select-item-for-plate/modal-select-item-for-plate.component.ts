import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ControlsService, NotificationService } from '@ddsi-labs-apps/services';
import { ITEM_TYPE, NotificationSeverity, PLATE_ATTRIBUTE, PLATE_LABEL } from '@ddsi-labs-apps/enums';
import { PatientService } from '@ddsi-labs-apps/services';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IsPatientAlreadyAddedPipe } from '@ddsi-labs-apps/pipes';
import { PlateModel, ControlModel, Patient } from '@ddsi-labs-apps/models';
import { PatientAddComponent } from '../common-util.module';

@Component({
  selector: 'ddsi-labs-apps-modal-select-item-for-plate',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    IsPatientAlreadyAddedPipe,
  ],
  providers: [IsPatientAlreadyAddedPipe],
  templateUrl: './modal-select-item-for-plate.component.html',
  styleUrls: ['./modal-select-item-for-plate.component.scss'],
})
export class ModalSelectItemForPlateComponent {
  item_type: ITEM_TYPE = ITEM_TYPE.CONTROL;
  plateInfos?: PlateModel;
  selectedItem?: ControlModel | Patient;
  ITEM_TYPE = ITEM_TYPE;
  list: (PlateModel | Patient)[] = [];
  PLATE_PLAN_LABEL = PLATE_LABEL;
  PLATE_ATTRIBUTE = PLATE_ATTRIBUTE;
  itemCounts = 10;

  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;
  @ViewChild('dt1') table?: Table;
  constructor(
    private controlService: ControlsService,
    private patientService: PatientService,
    private dynamicDialogConf: DynamicDialogConfig,
    private dynamicDialogRef: DynamicDialogRef,
    private dialogService: DialogService,
    private notificationService: NotificationService
  ) {
    const data = this.dynamicDialogConf.data;
    this.isRowSelectable = this.isRowSelectable.bind(this);
    this.item_type = data?.item_type;
    this.plateInfos = data?.plateInfos;
    this.selectedItem = data?.selectedItem;
  }

  isRowSelectable(event: { data: Patient }) {
    return this.item_type === ITEM_TYPE.CONTROL
      ? true
      : this.isAlreadySelected(event.data);
  }

  isAlreadySelected(data: Patient) {
    const found = this.plateInfos?.patients?.find(
      (elt: { id: string }) => elt.id === data.id
    );
    return !found;
  }

  lazyLoadTableItems(params: any) {
    if (this.item_type === ITEM_TYPE.CONTROL) {
      this.fetchListControl(null);
    } else if (this.item_type === ITEM_TYPE.PATIENT) {
      this.fetchListPatient(params);
    }
  }

  submitSelection() {
    this.dynamicDialogRef.close({ selected: this.selectedItem });
  }

  fetchListPatient(params: any) {
    const endpoint_params: { limit: string; page: number; search?: string } = {
      limit: params?.rows,
      page: params?.first / params?.rows,
    };
    if (params?.globalFilter) {
      endpoint_params['search'] = params.globalFilter;
    }
    this.loading = true;
    this.patientService.getListPatients(endpoint_params).subscribe({
      next: (resp: { count: number; results: any[] }) => {
        this.loading = false;
        this.itemCounts = resp.count;
        this.list = resp.results;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }

  fetchListControl(params: any) {
    const endpoint_params = {
      limit: params?.rows,
      page: params?.first / params?.rows,
    };
    this.loading = true;
    this.controlService.getListControl(endpoint_params).subscribe({
      next: (resp: any) => {
        this.list = resp;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    if (this.item_type === ITEM_TYPE.PATIENT) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
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
          this.table?.reset();
          this.notificationService.displayNotification(NotificationSeverity.SUCCESS, `Creation`, 'Opération effectuée avec succés' );
        }
      },
    });
  }
}
