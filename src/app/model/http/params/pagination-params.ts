import {HttpParams} from '@angular/common/http';
import {RequestedPagination} from '../../DTOs/other/requested-pagination';

export class PaginationParams {

  static createTrainingsPaginationParams(pagination: RequestedPagination): HttpParams {
    return new HttpParams()
      .set('page', pagination.page.toString())
      .set('size', pagination.size.toString())
      .set('sort', pagination.sort + ',' + pagination.sortDir);
  }

  static createSandboxPaginationParams(pagination: RequestedPagination): HttpParams {
    return new HttpParams()
      .set('page', (pagination.page + 1).toString()) // + 1 because PythonAPI pages starts with 1 instead of 0
      .set('page_size', pagination.size.toString());
  }
}
