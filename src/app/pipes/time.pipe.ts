import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  format(val : number) : string {
    if(val === 0) {
      return "00";
    } else if(val < 10) {
      return "0" + val;
    } else {
      return "" + val;
    }
  }

  transform(value: number, args?: any): any {

    let decis = Math.floor((value % 1000)/10);

    value = Math.floor(value / 1000);
    let seconds = value % 60;

    value = Math.floor(value / 60);
    let minutes = value % 60;

    value = Math.floor(value / 60);
    let hours = value;

    let result = "";
    if(hours > 0) {
      result += this.format(hours);
      result += ":";
    }
    result += this.format(minutes);
    result += ":";
    result += this.format(seconds);
    result += ":";


    if(decis < 10) {
      result += "0";
    }
    result += decis;

    return result;
  }

}
