import {HttpParams} from '@angular/common/http';
import {TablePagination} from '../../DTOs/other/table-pagination';

export class PaginationParams {

  static createTrainingsPaginationParams(pagination: TablePagination): HttpParams {
    return new HttpParams()
      .set('page', pagination.page.toString())
      .set('size', pagination.size.toString())
      .set('sort', pagination.sort + ',' + pagination.sortDir);
  }

  static createSandboxPaginationParams(pagination: TablePagination): HttpParams {
    return new HttpParams()
      .set('page', pagination.page.toString())
      .set('page_size', pagination.size.toString());
  }
}
