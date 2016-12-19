import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: number, args?: any): any {
    return moment(new Date(value)).format("MMM DD, YYYY - HH:MM:SS");
  }

}
