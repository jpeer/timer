import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'color'
})
export class ColorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch(value) {
      case 'r': return 'red';
      case 'b': return 'blue';
      case 'g': return 'green';
      case 'y': return 'yellow';
      case 'w': return 'white';
      case 'o': return 'orange';
      default: throw "unknown cube color code";
    }
  }

}
