import {TableAdapterPagination} from './table-adapter-pagination';

export class PaginatedResource<T> {
  elements: T;
  pagination: TableAdapterPagination;

  constructor(rows: T, pagination: TableAdapterPagination) {
    this.elements = rows;
    this.pagination = pagination;
  }
}
