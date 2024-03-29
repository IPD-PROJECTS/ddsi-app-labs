import {
  Component,
  HostBinding,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import {
  PlateModel,
  plateDetailsSignal,
  PlateItemPositionModel,
  ControlModel,
  ItemPosition,
  Patient,
} from '@ddsi-labs-apps/models';
import { ITEM_TYPE, LabelType } from '@ddsi-labs-apps/enums';
import {
  GetLabelOfPlateItemPipe,
  NextCaracterPipe,
  FindPlateItemByPositionPipe,
  LabelOfPlateItemFilledPipe,
  CheckStatusPlateItemPipe,
} from '@ddsi-labs-apps/pipes';
import { DialogService } from 'primeng/dynamicdialog';
import { ModalSelectItemForPlateComponent } from '../modal-select-item-for-plate/modal-select-item-for-plate.component';

const COLUMN_INDEX_FOR_CONTROLS = 0;
@Pipe({
  name: 'getActionMenuByPlateItem',
  standalone: true,
})
export class GetActionMenuByPlateItemPipe implements PipeTransform {
  constructor(
    private dialogService: DialogService,
    private getLabelOfPlateItemPositionPipe: GetLabelOfPlateItemPipe
  ) {}

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
          const index_item = [
            ...((itemData.type === ITEM_TYPE.CONTROL
              ? plateDetails.controls
              : plateDetails.patients) || []),
          ].findIndex(
            (elt: { location_name: string }) =>
              elt.location_name === location_name
          );
          if (index_item >= 0) {
            const newValue: ItemPosition = { ...value.selected, location_name };
            this.replaceItemOnPlate(itemData.type, newValue, index_item);
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
      plateDetails.controls = [...(plateDetails.controls ?? []), itemPosition];
    if (itemType === ITEM_TYPE.PATIENT)
      plateDetails.patients = [
        ...(plateDetails.patients ?? []),
        { ...item, ...itemPosition },
      ];
    plateDetailsSignal.set(plateDetails);
  }

  replaceItemOnPlate(itemType: ITEM_TYPE, item: any, index: number) {
    const plateDetails: PlateModel = { ...plateDetailsSignal() };
    if (itemType === ITEM_TYPE.CONTROL) {
      plateDetails.controls = [...(plateDetails.controls ?? [])];
      plateDetails.controls[index] = item;
    }
    if (itemType === ITEM_TYPE.PATIENT) {
      plateDetails.patients = [...(plateDetails.patients || [])];
      plateDetails.patients[index] = item;
    }
    plateDetailsSignal.set(plateDetails);
  }

  removeItemFromPlatePlan(
    item: { id: string; location_name: string },
    plate: PlateModel,
    type: ITEM_TYPE
  ) {
    if (type === ITEM_TYPE.CONTROL) {
      plate.controls = [
        ...(plate?.controls?.filter(
          (elt: { id: string; location_name: string }) =>
            elt.location_name !== item.location_name
        ) ||  []),
      ];
    } else if (type === ITEM_TYPE.PATIENT) {
      plate.patients = [
        ...(plate?.patients?.filter(
          (elt: { id: string; location_name: string }) =>
            elt.location_name !== item.location_name
        ) || []),
      ];
    }
    plateDetailsSignal.set(plate);
  }

  transform(
    position: { rowIndex: number; colIndex: number },
    data: { plateDetails: PlateModel | undefined; contentItemFilled: any }
  ): MenuItem[] {
    let response = [
      {
        label: 'Controls',
        items: [
          {
            label: `Ajouter un Control`,
            icon: 'pi pi-plus',
            command: () => {
              if (data.plateDetails)
                this.openModalFillPlate(data.plateDetails, {
                  position,
                  type: ITEM_TYPE.CONTROL,
                  item: data.contentItemFilled,
                });
            },
          },
          {
            label: 'Supprimer Control',
            icon: 'pi pi-times',
            disabled: !data.contentItemFilled,
            command: () => {
              if (data.plateDetails)
                this.removeItemFromPlatePlan(
                  data.contentItemFilled,
                  data.plateDetails,
                  ITEM_TYPE.CONTROL
                );
            },
          },
        ],
      },
      {
        label: 'Patients',
        items: [
          {
            label: `Ajouter un patient`,
            icon: 'pi pi-plus',
            command: () => {
              if (data.plateDetails)
                this.openModalFillPlate(data.plateDetails, {
                  position,
                  type: ITEM_TYPE.PATIENT,
                  item: data.contentItemFilled,
                });
            },
          },
          {
            label: 'Supprimer un patient',
            icon: 'pi pi-times',
            disabled: !data.contentItemFilled,
            command: () => {
              if (data.plateDetails)
                this.removeItemFromPlatePlan(
                  data.contentItemFilled,
                  data.plateDetails,
                  ITEM_TYPE.PATIENT
                );
            },
          },
        ],
      }
    ];
    if (data.contentItemFilled?.control_name) {
      response = [
        {
          label: 'Controls',
          items: [
            {
              label: `Remplacer un control`,
              icon: 'pi pi-plus',
              command: () => {
                if (data.plateDetails)
                  this.openModalFillPlate(data.plateDetails, {
                    position,
                    type: ITEM_TYPE.CONTROL,
                    item: data.contentItemFilled,
                  });
              },
            },
            {
              label: 'Supprimer un control',
              icon: 'pi pi-times',
              disabled: !data.contentItemFilled,
              command: () => {
                if (data.plateDetails)
                  this.removeItemFromPlatePlan(
                    data.contentItemFilled,
                    data.plateDetails,
                    ITEM_TYPE.CONTROL
                  );
              },
            },
          ],
        },
      ];
    } else if(data.contentItemFilled?.anon_name) {
      response = [
        {
          label: 'Patients',
          items: [
            {
              label: `Remplacer un patient`,
              icon: 'pi pi-plus',
              command: () => {
                if (data.plateDetails)
                  this.openModalFillPlate(data.plateDetails, {
                    position,
                    type: ITEM_TYPE.PATIENT,
                    item: data.contentItemFilled,
                  });
              },
            },
            {
              label: 'Supprimer un patients',
              icon: 'pi pi-times',
              disabled: !data.contentItemFilled,
              command: () => {
                if (data.plateDetails)
                  this.removeItemFromPlatePlan(
                    data.contentItemFilled,
                    data.plateDetails,
                    ITEM_TYPE.PATIENT
                  );
              },
            },
          ],
        },
      ];
    }
    return response;
  }
}

@Component({
  selector: 'ddsi-labs-apps-plate-plan-preview-block',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TooltipModule,
    GetLabelOfPlateItemPipe,
    NextCaracterPipe,
    MenuModule,
    GetActionMenuByPlateItemPipe,
    CheckStatusPlateItemPipe,
    LabelOfPlateItemFilledPipe,
    FindPlateItemByPositionPipe,
  ],
  providers: [
    DialogService,
    NextCaracterPipe,
    GetLabelOfPlateItemPipe,
    GetActionMenuByPlateItemPipe,
    CheckStatusPlateItemPipe,
    LabelOfPlateItemFilledPipe,
    FindPlateItemByPositionPipe,
  ],
  templateUrl: './plate-plan-preview-block.component.html',
  styleUrls: ['./plate-plan-preview-block.component.scss'],
})
export class PlatePlanPreviewBlockComponent {
  @Input() @HostBinding('style.--filled-color') defaultFillColor = 'orange';
  @Input() @HostBinding('style.--filled-color-Male') fillColorMale = 'blue';
  @Input() @HostBinding('style.--filled-color-Female') fillColorFemale = 'pink';
  @Input() @HostBinding('style.--filled-color-POS') fillColorPOS = 'green';
  @Input() @HostBinding('style.--filled-color-WHITE') fillColorWHITE = 'gray';
  @Input() @HostBinding('style.--filled-color-NEG') fillColorNEG = 'red';

  COLUMN_INDEX_FOR_CONTROLS = COLUMN_INDEX_FOR_CONTROLS;
  @Input() rowLength = 8;
  @Input() rowLabelType: LabelType = LabelType.LETTER;
  @Input() colLength = 12;
  @Input() colLabelType: LabelType = LabelType.NUMBER;
  @Input() disabled = false;
  @Input() plateDetails?: PlateModel;
  @Input() disableMenu = false;
  @Input() closePlate = false;
}
