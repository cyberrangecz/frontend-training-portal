import {DatePipe} from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';

/**
 * Transforms date to string in european style DD/MM/YYYY HH:MM format
 */
@Pipe({name: 'dateTimeFormat'})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, 'dd MMM yyyy HH:mm');
  }
}
