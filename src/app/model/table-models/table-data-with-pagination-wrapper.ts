import {TablePagination} from "./table-pagination";

export class TableDataWithPaginationWrapper<T> {
  tableData: T;
  tablePagination: TablePagination;


  constructor(tableData: T, tablePagination: TablePagination) {
    this.tableData = tableData;
    this.tablePagination = tablePagination;
  }
}
