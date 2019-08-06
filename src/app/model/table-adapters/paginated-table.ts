import {TableAdapterPagination} from "./table-adapter-pagination";

export class PaginatedTable<T> {
  tableData: T;
  tablePagination: TableAdapterPagination;

  constructor(tableData: T, tablePagination: TableAdapterPagination) {
    this.tableData = tableData;
    this.tablePagination = tablePagination;
  }
}
