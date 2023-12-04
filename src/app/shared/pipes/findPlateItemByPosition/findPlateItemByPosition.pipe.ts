import { Pipe, PipeTransform } from '@angular/core';
import { PlateModel } from 'src/app/models/plate.model';

@Pipe({
  name: 'findPlateItemByPosition',
  standalone: true,
})
export class FindPlateItemByPositionPipe implements PipeTransform {
  transform(plateDetails: PlateModel | undefined, labelPosition: string): { location_name: string, control_name?: string } | undefined {
    const positions: { location_name: string, control_name?: string }[] = [...plateDetails?.controls ?? [], ...plateDetails?.patients ?? []];
    const found = positions.find((elt) => elt.location_name === labelPosition);
    return found;
  }
}
