import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { ModalSelectItemForPlateComponent } from '../../components/modal-select-item-for-plate/modal-select-item-for-plate.component';
import { GetLabelOfPlateItemPipe } from '../../pipes/getLabelOfPlateItem/getLabelOfPlateItem.pipe';
import { ItemPosition, PlateItemPositionModel, Patient, ControlModel ,PlateModel, plateDetailsSignal } from '@ddsi-labs-apps/models';
import { ENV_KEY, ITEM_TYPE, LabelType } from '../../enum';

const BASE_URL = `${process.env[ENV_KEY.BASE_URL]}`;
const platesEndpoint = `${BASE_URL}/api/v1/plates/`;



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
    return this.http.patch(`${platesEndpoint}${data.id}`, data);
  }

  getPlateDetailsById(id: string | null) {
    if (id) {
      return this.http.get(`${platesEndpoint}${id}`);
    }
    return of();
  }

  deletePlate(data: PlateModel) {
    return this.http.delete(`${platesEndpoint}${data.id}`);
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
          const index_item = [ ...((itemData.type === ITEM_TYPE.CONTROL ? plateDetails.controls : plateDetails.patients) ||  [] )
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
    const itemPosition: ItemPosition = {
      id: item.id,
      control_name: item['control_name'],
      location_name: locationName,
    };
    const plateDetails: PlateModel = { ...plateDetailsSignal() };
    if (itemType === ITEM_TYPE.CONTROL)
      plateDetails.controls = [...plateDetails.controls!, itemPosition];
    if (itemType === ITEM_TYPE.PATIENT)
      plateDetails.patients = [...plateDetails.patients!, itemPosition];
    plateDetailsSignal.set(plateDetails);

  }

  replaceItemOnPlate(itemType: ITEM_TYPE, item: any, index: number) {
    const plateDetails: PlateModel = { ...plateDetailsSignal() };
    if (itemType === ITEM_TYPE.CONTROL) {
      plateDetails.controls = [...plateDetails.controls!];
      plateDetails.controls![index] = item;
    }
    if (itemType === ITEM_TYPE.PATIENT) {
      plateDetails.patients = [...plateDetails.patients!];
      plateDetails.patients![index] = item;
    }
    plateDetailsSignal.set(plateDetails);
  }

  fillPlateWithItems(idPlate: number, plateDetailsUpdated: PlateModel) {
    const data = {
      patients: plateDetailsUpdated.patients,
      controls: plateDetailsUpdated.controls
    }
    return this.http.post(
      `${platesEndpoint}${idPlate}/fill`,
      data
    );
  }
}
