import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scramblepipe'
})
export class ScramblePipe implements PipeTransform {

  transform(value: string[], args?: any): any {
    if(!value) {
      return "";
    }

    let res="";
    for(let i = 0; i < value.length; i++) {
      res += " " + this.translate(value[i]);
    }
    return res;
  }

  private translate(s: string) {
    switch(s) {
      case "l": return "L'";
      case "f": return "F'";
      case "r": return "R'";
      case "b": return "B'";
      case "u": return "U'";
      case "d": return "D'";
      default: return s;
    }

  }
}
