import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nextCaracter',
  standalone: true,
})
export class NextCaracterPipe implements PipeTransform {
  transform(index: number, ...args: unknown[]): string {
    if(index === 0) {
      return 'a'
    } else {
      return String.fromCharCode('a'.charCodeAt(0)+index)
    }
  }
}
