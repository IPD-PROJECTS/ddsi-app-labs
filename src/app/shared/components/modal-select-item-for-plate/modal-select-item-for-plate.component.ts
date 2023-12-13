import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ControlsService } from '../../service/controls/controls.service';
import { ITEM_TYPE } from '../../enum';
import { PatientService } from '../../service/patient/patient.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IsPatientAlreadyAddedPipe } from '../../pipes/isPatientAlreadyAdded/isPatientAlreadyAdded.pipe';
import { PLATE_ATTRIBUTE, PLATE_LABEL } from '../../enum';
import { PlateModel, ControlModel, Patient } from '@ddsi-labs-apps/models';



@Component({
  selector: 'ddsi-labs-apps-modal-select-item-for-plate',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule, IsPatientAlreadyAddedPipe],
  providers:[IsPatientAlreadyAddedPipe],
  templateUrl: './modal-select-item-for-plate.component.html',
  styleUrls: ['./modal-select-item-for-plate.component.scss'],
})
export class ModalSelectItemForPlateComponent {
  item_type: ITEM_TYPE = ITEM_TYPE.CONTROL;
  plateInfos?: PlateModel;
  selectedItem ?: (ControlModel | Patient);
  ITEM_TYPE = ITEM_TYPE;
  list: (PlateModel | Patient)[] = [];
  PLATE_PLAN_LABEL = PLATE_LABEL;
  PLATE_ATTRIBUTE = PLATE_ATTRIBUTE;
  itemCounts = 10;

  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;

  constructor(private controlService: ControlsService, private patientService: PatientService, private dynamicDialogConf: DynamicDialogConfig, private dynamicDialogRef: DynamicDialogRef) {
    const data = this.dynamicDialogConf.data;
    this.isRowSelectable = this.isRowSelectable.bind(this);
    this.item_type = data?.item_type;
    this.plateInfos = data?.plateInfos;
    this.selectedItem = data?.selectedItem;
  }


  isRowSelectable(event: {data: Patient}) {
    return this.item_type === ITEM_TYPE.CONTROL ? true : this.isAlreadySelected(event.data);
}

isAlreadySelected(data: Patient) {
  const found = this.plateInfos?.patients?.find((elt: {id: string}) => elt.id === data.id);
  return !found;
}

  lazyLoadTableItems(params: any) {
    if(this.item_type === ITEM_TYPE.CONTROL) {
      this.fetchListPlatePlan(null)
    } else if(this.item_type === ITEM_TYPE.PATIENT) {
      this.fetchListPatient(params);
    }
  }

  submitSelection() {
    this.dynamicDialogRef.close({ selected: this.selectedItem});
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
        this.itemCounts = resp.count;
        this.list = resp.results;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }

  fetchListPlatePlan(params: any) {
    const endpoint_params = {
      limit: params?.rows,
      page: (params?.first / params?.rows)
    }
    this.loading = true;
    this.controlService.getListControl(endpoint_params).subscribe({
      next:(resp: any) => {
        this.list = resp;
        this.loading = false;
      },
      error:(err) => {
        this.loading = false;
      }
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

}
