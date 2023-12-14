import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isPatientAlreadyAdded',
  standalone: true,
})
export class IsPatientAlreadyAddedPipe implements PipeTransform {
  transform(item: any, list?: any[],): boolean {
    const found = list?.find((elt) => elt.id === item.id);
    return !!found;
  }
}
