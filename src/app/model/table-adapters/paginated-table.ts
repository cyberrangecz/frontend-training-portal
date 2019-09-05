import {TableAdapterPagination} from "./table-adapter-pagination";

export class PaginatedTable<T> {
  rows: T;
  pagination: TableAdapterPagination;

  constructor(rows: T, pagination: TableAdapterPagination) {
    this.rows = rows;
    this.pagination = pagination;
  }
}
