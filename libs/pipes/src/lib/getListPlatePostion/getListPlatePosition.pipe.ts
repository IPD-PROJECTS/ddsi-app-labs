import { Pipe, PipeTransform } from '@angular/core';
import { NextCaracterPipe } from '../nextCaracter/nextCaracter.pipe';
import { LabelType } from '@ddsi-labs-apps/enums';

@Pipe({
  name: 'getListPlatePosition',
  standalone: true,
})
export class GetListPlatePositionPipe implements PipeTransform {
  constructor(private caracter: NextCaracterPipe){}
  transform(data: {rowLength: number, rowLabelType: LabelType, colLength: number, colLabelType: LabelType}): {label: string, value: string}[] {
    const listPostion: {label: string, value: string}[] = [];

    for (let rowIndex = 0; rowIndex < data.rowLength; rowIndex++) {
      for (let colIndex = 0; colIndex < data.colLength; colIndex++) {
        const position : string[] = [];
        position[0] = data.rowLabelType === LabelType.LETTER ? this.caracter.transform(rowIndex) : (rowIndex + 1).toString();
        position[1] = data.colLabelType === LabelType.LETTER ? this.caracter.transform(colIndex) : (colIndex + 1).toString();
        listPostion.push({label: position.join('').toUpperCase(), value: position.join('').toUpperCase()});
      }

    }
    return listPostion;
  }
}
