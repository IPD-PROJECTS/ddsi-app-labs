import { Pipe, PipeTransform } from '@angular/core';
import { PlateModel } from 'src/app/models/plate.model';
import { FindPlateItemByPositionPipe } from '../findPlateItemByPosition/findPlateItemByPosition.pipe';

@Pipe({
  name: 'labelOfPlateItemFilled',
  standalone: true,
})
export class LabelOfPlateItemFilledPipe implements PipeTransform {
  constructor(private findPlateItemByPosition: FindPlateItemByPositionPipe){}
  transform(plateDetails: PlateModel | undefined, labelPosition: string): string {
    const found = this.findPlateItemByPosition.transform(plateDetails, labelPosition);
    let response = labelPosition;
    if(found) {
      if(found?.control_name) {
        response += ' - '+found.control_name
      }
    }
    return response;
  }
}
