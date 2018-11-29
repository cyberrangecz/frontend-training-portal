import {TablePagination} from "./table-pagination";
import {ITableDataModel} from "./itable-data-model";

export class TableDataWithPaginationWrapper<T extends ITableDataModel> {
  tableData: T;
  tablePagination: TablePagination;


  constructor(tableData: T, tablePagination: TablePagination) {
    this.tableData = tableData;
    this.tablePagination = tablePagination;
  }
}
