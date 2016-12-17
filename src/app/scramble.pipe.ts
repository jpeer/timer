import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scramblepipe'
})
export class ScramblePipe implements PipeTransform {

  transform(value: string[], args?: any): any {
    if(!value) {
      return "";
    }

    var res="";
    value.forEach(x => res += (" " + x));
    return res;
  }

}
