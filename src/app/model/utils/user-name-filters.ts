import {Filter} from './filter';

/**
 * Creates filters from user name filter value
 */
export class UserNameFilters {
  static create(filterValue: string): Filter[] {
     if (!filterValue || filterValue === '' || filterValue.trim().length <= 0) {
      return [];
    }
    const splitted = filterValue.split(' ');
    if (splitted.length === 1) {
      return [new Filter('familyName', splitted[0])];
    }
    if (splitted.length > 1) {
      return [
        new Filter('givenName', splitted[0]),
        new Filter('familyName', splitted[1])
      ];
    }
  }
}
