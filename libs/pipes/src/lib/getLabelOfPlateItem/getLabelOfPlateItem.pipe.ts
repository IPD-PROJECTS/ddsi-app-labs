import { Pipe, PipeTransform } from '@angular/core';
import { NextCaracterPipe } from '../nextCaracter/nextCaracter.pipe';
import { LabelType } from '@ddsi-labs-apps/enums';

@Pipe({
  name: 'getLabelOfPlateItem',
  standalone: true,
})
export class GetLabelOfPlateItemPipe implements PipeTransform {
  constructor(private caracterPipe: NextCaracterPipe){}
  transform(value: { rowLabelType: LabelType, colLabelType: LabelType, rowIndex: number, colIndex: number }, ...args: unknown[]): string {
    let postion = '';
    if(value.rowLabelType === LabelType.LETTER) {
      postion += this.caracterPipe.transform(value.rowIndex)
    } else {
      postion += value.rowIndex + 1
    }
    if(value.colLabelType === LabelType.LETTER) {
      postion += this.caracterPipe.transform(value.colIndex);
    } else {
      postion += value.colIndex + 1
    }

    return postion;
  }
}
