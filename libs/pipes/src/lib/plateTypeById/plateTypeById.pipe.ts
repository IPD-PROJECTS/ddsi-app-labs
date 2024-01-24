import { Pipe, PipeTransform } from '@angular/core';
import { PlateTypeModel } from '@ddsi-labs-apps/models';

@Pipe({
  name: 'plateTypeById',
  standalone: true,
})
export class PlateTypeByIdPipe implements PipeTransform {
  transform(id: string, listPlate: PlateTypeModel[]): PlateTypeModel | undefined {
    return  listPlate.find((elt) => elt.id === id);
  }
}
