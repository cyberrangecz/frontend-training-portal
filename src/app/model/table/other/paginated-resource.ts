import {Pagination} from './pagination';

/**
 * Generic class of paginated resource
 */
export class PaginatedResource<T> {
  elements: T[];
  pagination: Pagination;

  constructor(elements: T[], pagination: Pagination) {
    this.elements = elements;
    this.pagination = pagination;
  }
}
