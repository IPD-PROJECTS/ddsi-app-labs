import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV_KEY, ITEM_TYPE } from '../../util';
import { PlateModel } from 'src/app/models/plate.model';
import { of } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { ModalSelectItemForPlateComponent } from '../../components/modal-select-item-for-plate/modal-select-item-for-plate.component';
import { ControlModel } from 'src/app/models/controls.model';
import { Patient } from 'src/app/models/patient.model';
import { PlateItemPositionModel } from 'src/app/models/position.model';
import { plateDetailsSignal } from 'src/app/plate-plan-management/pages/create-plate-plan/create-plate-plan.component';
import { GetLabelOfPlateItemPipe } from '../../pipes/getLabelOfPlateItem/getLabelOfPlateItem.pipe';
import { LabelType } from 'src/app/plate-management/pages/create-plate-type/create-plate-type.component';
import _ from 'lodash';

const BASE_URL = `${process.env[ENV_KEY.BASE_URL]}`;
const platesEndpoint = `${BASE_URL}/api/v1/plates/`;

interface ItemPosition {
  id?: string;
  location_name: string;
  control_name?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlatePlanService {
  constructor(
    private http: HttpClient,
    private dialogService: DialogService,
    private getLabelOfPlateItemPositionPipe: GetLabelOfPlateItemPipe
  ) {}

  getListPlates(params?: any) {
    const data: HttpParams = params
      ? new HttpParams()
          .append('p', params?.page + 1)
          .append('size', params?.limit)
      : new HttpParams();
    return this.http.get<{ results: PlateModel[]; count: number }>(
      `${platesEndpoint}`,
      { params: data }
    );
  }

  updatePlate(data: PlateModel) {
    return this.http.put(`${platesEndpoint}/${data.id}`, data);
  }

  getPlateDetailsById(id: string | null) {
    if (id) {
      return this.http.get(`${platesEndpoint}/${id}`);
    }
    return of();
  }

  deletePlate(data: PlateModel) {
    return this.http.delete(`${platesEndpoint}/${data.id}`);
  }

  createPlate(data: PlateModel) {
    return this.http.post(`${platesEndpoint}`, data);
  }

  openModalFillPlate(
    plateInfos: PlateModel,
    itemData: { position: PlateItemPositionModel; type: ITEM_TYPE; item: any }
  ) {
    const header =
      itemData.type === ITEM_TYPE.CONTROL
        ? 'Select a control'
        : 'Select a patient';
    const ref = this.dialogService.open(ModalSelectItemForPlateComponent, {
      header,
      data: {
        plateInfos,
        item_type: itemData.type,
        selectedItem: itemData.item,
      },
    });
    ref.onClose.subscribe({
      next: (value?: { selected: ControlModel | Patient }) => {
        if (value) {
          const plateDetails: PlateModel = { ...plateDetailsSignal() };
          const location_name = this.getLabelOfPlateItemPositionPipe
            .transform({
              rowLabelType: LabelType.LETTER,
              colLabelType: LabelType.NUMBER,
              rowIndex: itemData.position.rowIndex!,
              colIndex: itemData.position.colIndex!,
            })
            .toUpperCase();
          const index_item = [ ...(itemData.type === ITEM_TYPE.CONTROL ? plateDetails.wells!.controls : plateDetails.wells!.patients)!
          ].findIndex((elt: { location_name: string }) => elt.location_name === location_name );
          if (index_item >= 0) {
            const newValue: ItemPosition = {...value.selected,location_name}
            this.replaceItemOnPlate(itemData.type, newValue, index_item!);
          } else {
            this.addItemToPlate(location_name, itemData.type, value.selected);
          }
        }
      },
    });
  }

  addItemToPlate(locationName: string, itemType: ITEM_TYPE, item: any) {
    let itemPosition: ItemPosition = {
      id: item.id,
      control_name: item['control_name'],
      location_name: locationName,
    };
    const plateDetails: PlateModel = { ...plateDetailsSignal() };

    if (itemType === ITEM_TYPE.CONTROL) plateDetails.wells = {patients: plateDetails.wells!.patients, controls: [...plateDetails.wells?.controls!, itemPosition]} ;
    if (itemType === ITEM_TYPE.PATIENT) plateDetails.wells = {controls: plateDetails.wells!.controls, patients: [...plateDetails.wells?.patients!, itemPosition]} ;
    plateDetailsSignal.set(plateDetails);

  }

  replaceItemOnPlate(itemType: ITEM_TYPE, item: any, index: number) {
    const plateDetails: PlateModel = { ...plateDetailsSignal() };
    if (itemType === ITEM_TYPE.CONTROL) {
        plateDetails.wells = { patients: plateDetails.wells!.patients, controls: [...plateDetails.wells!.controls!]};
        plateDetails.wells!.controls![index] = item;
    }
    if (itemType === ITEM_TYPE.PATIENT) {
        plateDetails.wells = { controls: plateDetails.wells!.controls,patients: [...plateDetails.wells?.patients!]};
        plateDetails.wells!.patients![index] = item;
    }
    plateDetailsSignal.set(plateDetails);
  }

  fillPlateWithItems(idPlate: number, plateDetailsUpdated: PlateModel) {
    const data = {
      patients: plateDetailsUpdated.wells?.patients,
      controls: plateDetailsUpdated.wells?.controls
    }
    return this.http.post(
      `${platesEndpoint}${idPlate}/fill`,
      data
    );
  }
}
