import {KypoFilter} from 'kypo-common';

/**
 * Creates filters from user name filter value
 */
export class UserNameFilters {
  static create(filterValue: string): KypoFilter[] {
     if (!filterValue || filterValue === '' || filterValue.trim().length <= 0) {
      return [];
    }
    const splitted = filterValue.split(' ');
    if (splitted.length === 1) {
      return [new KypoFilter('familyName', splitted[0])];
    }
    if (splitted.length > 1) {
      return [
        new KypoFilter('givenName', splitted[0]),
        new KypoFilter('familyName', splitted[1])
      ];
    }
  }
}
