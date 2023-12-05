import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelType } from 'src/app/plate-management/pages/create-plate-type/create-plate-type.component';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { GetLabelOfPlateItemPipe } from '../../pipes/getLabelOfPlateItem/getLabelOfPlateItem.pipe';
import { NextCaracterPipe } from '../../pipes/nextCaracter/nextCaracter.pipe';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { PlatePlanService } from '../../service/plate-plan/plate-plan.service';
import { PlateModel } from 'src/app/models/plate.model';
import { ITEM_TYPE } from '../../util';
import { PlateItemPositionModel } from 'src/app/models/position.model';
import { CheckStatusPlateItemPipe } from '../../pipes/checkStatusPlateItem/checkStatusPlateItem.pipe';
import { LabelOfPlateItemFilledPipe } from '../../pipes/labelOfPlateItemFilled/labelOfPlateItemFilled.pipe';
import { FindPlateItemByPositionPipe } from '../../pipes/findPlateItemByPosition/findPlateItemByPosition.pipe';
import { plateDetailsSignal } from 'src/app/plate-plan-management/pages/create-plate-plan/create-plate-plan.component';

const COLUMN_INDEX_FOR_CONTROLS = 0;
@Pipe({
  name: 'getActionMenuByPlateItem',
  standalone: true,
})
export class GetActionMenuByPlateItemPipe implements PipeTransform {
  constructor(private platePlanService: PlatePlanService){}

  openModalFillPlate(plateDetails: PlateModel, typeItem: ITEM_TYPE, position: PlateItemPositionModel, item: any) {
    this.platePlanService.openModalFillPlate(plateDetails, {position, type: typeItem, item});
  }

  removeItemFromPlatePlan(item: {id: string, location_name: string}, plate: PlateModel, type: ITEM_TYPE) {
    if(type === ITEM_TYPE.CONTROL) {
      plate.controls = [...plate.controls?.filter((elt: {id: string, location_name: string}) => elt.location_name !== item.location_name)!]
    } else if(type === ITEM_TYPE.PATIENT) {
      plate.patients = [...plate.patients?.filter((elt: {id: string, location_name: string}) => elt.location_name !== item.location_name)!]
    }
    plateDetailsSignal.set(plate);
  }

  transform(position:{ rowIndex: number, colIndex: number }, data: {plateDetails?: any, contentItemFilled: any}): MenuItem[] {
    const menu: MenuItem[] = [];
    if(position.colIndex === COLUMN_INDEX_FOR_CONTROLS) {
      return [
        {
          label: 'Controls',
          items: [
            {
              label: `${!!data.contentItemFilled ? 'Replace' : 'Add'} Control`,
              icon: 'pi pi-plus',
              command:() => {
                this.openModalFillPlate(data.plateDetails, ITEM_TYPE.CONTROL, position, data.contentItemFilled)
              }
            },
            {
              label: 'Remove Control',
              icon: 'pi pi-times',
              disabled: !data.contentItemFilled,
              command: () => {
                this.removeItemFromPlatePlan(data.contentItemFilled, data.plateDetails, ITEM_TYPE.CONTROL);
              }
            },
          ],
        }
      ]
    }
    return [
      {
        label: 'Patients',
        items: [
          {
            label: `${data.contentItemFilled ? 'Replace' : 'Add'} Patients`,
            icon: 'pi pi-plus',
            command:() => {
              this.openModalFillPlate(data.plateDetails, ITEM_TYPE.PATIENT, position, data.contentItemFilled)
            }
          },
          {
            label: 'Remove Patients',
            icon: 'pi pi-times',
            disabled: !data.contentItemFilled,
            command: () => {
              this.removeItemFromPlatePlan(data.contentItemFilled, data.plateDetails, ITEM_TYPE.PATIENT);
            },
          },
        ],
      }
    ]
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
    FindPlateItemByPositionPipe
  ],
  providers: [NextCaracterPipe, GetLabelOfPlateItemPipe, GetActionMenuByPlateItemPipe, CheckStatusPlateItemPipe, LabelOfPlateItemFilledPipe, FindPlateItemByPositionPipe],
  templateUrl: './plate-plan-preview-block.component.html',
  styleUrls: ['./plate-plan-preview-block.component.scss'],
})
export class PlatePlanPreviewBlockComponent {
  COLUMN_INDEX_FOR_CONTROLS = COLUMN_INDEX_FOR_CONTROLS;
  @Input() rowLength: number = 8;
  @Input() rowLabelType: LabelType = LabelType.LETTER;
  @Input() colLength: number = 12;
  @Input() colLabelType: LabelType = LabelType.NUMBER;
  @Input() disabled = false;
  @Input() plateDetails?: PlateModel
}
