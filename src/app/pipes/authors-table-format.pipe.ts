import {Pipe, PipeTransform} from "@angular/core";
import {User} from '../model/user/user';

@Pipe({name: 'authorsTableFormat'})
export class AuthorsTableFormatPipe implements PipeTransform {
  transform(authors: User[]): string {
    if (authors && authors.length > 0) {
      return authors.length > 1
        ? authors[0].name + '...'
        : authors[0].name;
    } else {
      return '-';
    }
  }
}
