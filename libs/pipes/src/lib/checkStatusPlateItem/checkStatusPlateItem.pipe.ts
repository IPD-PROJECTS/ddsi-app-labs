import { Pipe, PipeTransform } from '@angular/core';
import { PlateModel } from '@ddsi-labs-apps/models';
import { GENDER, Result } from '@ddsi-labs-apps/enums';

@Pipe({
  name: 'checkStatusPlateItem',
  standalone: true,
})
export class CheckStatusPlateItemPipe implements PipeTransform {
  transform(
    plateDetails: PlateModel | undefined,
    labelPosition: string
  ): { status: Result; item?: any; class?: string } {
    let result: { status: Result; item?: any; class?: string } = {
      status: Result.EMPTY,
      class: '',
    };
    if (plateDetails?.controls?.length || plateDetails?.patients?.length) {
      const positions: {
        location_name: string;
        control_name?: string;
        sex?: GENDER;
      }[] = [];
      if (plateDetails.controls?.length)
        positions.push(...plateDetails.controls);
      if (plateDetails.patients?.length)
        positions.push(...plateDetails.patients);
      const found = positions.find(
        (elt) => elt.location_name === labelPosition
      );
      if (found) {
        result = {
          status: Result.FILLED,
          item: found,
          class: Result.FILLED
        };
        if(found.sex) {
          result = {...result, class: result.class + ' ' + found.sex}
        }
      }
    }

    return result;
  }
}
