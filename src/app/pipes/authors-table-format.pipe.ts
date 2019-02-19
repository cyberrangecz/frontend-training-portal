import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'authorsTableFormat'})
export class AuthorsTableFormatPipe implements PipeTransform {
  transform(authors: string[]): string {
    if (authors && authors.length > 0) {
      return authors.length > 1
        ? authors[0] + '...'
        : authors[0];
    } else {
      return '-';
    }
  }
}
