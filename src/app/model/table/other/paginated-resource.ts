import {Kypo2Pagination} from './kypo2-pagination';

/**
 * Generic class of paginated resource
 */
export class PaginatedResource<T> {
  elements: T;
  pagination: Kypo2Pagination;

  constructor(rows: T, pagination: Kypo2Pagination) {
    this.elements = rows;
    this.pagination = pagination;
  }
}
