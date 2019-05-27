import { Pipe, PipeTransform } from '@angular/core';
import {User} from '../model/user/user';

@Pipe({
  name: 'shorterAuthorsFormat'
})
export class ShorterAuthorsFormatPipe implements PipeTransform {
  private plural: string;
  private firstAuthorMsg: string;
  private isActiveUserInAuthors: boolean;

  transform(authors: User[], activeUserLogin: string): string {
    this.isActiveUserInAuthors = authors.some(author => author.login === activeUserLogin);
    this.firstAuthorMsg = this.isActiveUserInAuthors ? 'You' : authors[0].name;
    this.plural = authors.length > 2 ? 's' : '';
    if (authors.length === 1) {
      return this.firstAuthorMsg;
    }
    return this.firstAuthorMsg + ' and ' + (authors.length - 1) + ' other' + this.plural + '...';
  }
}
