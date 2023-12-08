import { Pipe, PipeTransform } from '@angular/core';
import { PlateModel } from 'src/app/models/plate.model';
import { Result } from '../../util';

@Pipe({
  name: 'checkStatusPlateItem',
  standalone: true
})
export class CheckStatusPlateItemPipe implements PipeTransform {
  transform(plateDetails: PlateModel | undefined, labelPosition: string): { status: Result, item?: any} {
    let result:{ status: Result, item?: any} = { status : Result.EMPTY};
    if(plateDetails?.wells?.controls?.length || plateDetails?.wells?.patients?.length) {
      const positions: {location_name: string, control_name?: string}[] = [];
      if(plateDetails.wells.controls?.length) positions.push(...plateDetails.wells.controls);
      if(plateDetails.wells.patients?.length) positions.push(...plateDetails.wells.patients);
      const found = positions.find((elt) =>  elt.location_name === labelPosition);
      if(found)  result = { status: Result.FILLED, item: found}
    }
    return result;
  }
}
