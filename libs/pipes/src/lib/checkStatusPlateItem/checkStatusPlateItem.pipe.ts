import { Pipe, PipeTransform } from '@angular/core';
import { PlateModel } from '@ddsi-labs-apps/models';
import { Result } from '@ddsi-labs-apps/enums';

@Pipe({
  name: 'checkStatusPlateItem',
  standalone: true
})
export class CheckStatusPlateItemPipe implements PipeTransform {
  transform(plateDetails: PlateModel | undefined, labelPosition: string): { status: Result, item?: any} {
    let result:{ status: Result, item?: any} = { status : Result.EMPTY};
    if(plateDetails?.controls?.length || plateDetails?.patients?.length) {
      const positions: {location_name: string, control_name?: string}[] = [];
      if(plateDetails.controls?.length) positions.push(...plateDetails.controls);
      if(plateDetails.patients?.length) positions.push(...plateDetails.patients);
      const found = positions.find((elt) =>  elt.location_name === labelPosition);
      if(found)  result = { status: Result.FILLED, item: found}
    }
    return result;
  }
}
