import { Pipe, PipeTransform } from '@angular/core';
import {User} from 'kypo2-auth';

@Pipe({
  name: 'shorterAuthorsFormat',
  pure: false
})
export class ShorterAuthorsFormatPipe implements PipeTransform {
  private plural: string;
  private firstAuthorMsg: string;
  private isActiveUserInAuthors: boolean;

  transform(authors: User[], activeUser: User): string {
    if (!authors || authors.length === 0) {
      return '';
    }
    this.isActiveUserInAuthors = authors.some(author => author.equals(activeUser));
    this.firstAuthorMsg = this.isActiveUserInAuthors ? 'You' : authors[0].name;
    this.plural = authors.length > 2 ? 's' : '';
    if (authors.length === 1) {
      return this.firstAuthorMsg;
    }
    return this.firstAuthorMsg + ' and ' + (authors.length - 1) + ' other' + this.plural + '...';
  }
}
