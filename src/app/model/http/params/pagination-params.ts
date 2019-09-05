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
      .set('page', pagination.page.toString())
      .set('page_size', pagination.size.toString());
  }
}
