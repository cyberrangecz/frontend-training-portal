import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortString'
})
export class ShortStringPipe implements PipeTransform {

  transform(text: string, maxLength: number = 10): string {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }
}
