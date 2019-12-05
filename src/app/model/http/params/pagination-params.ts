import {HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {RequestedPagination} from '../../DTOs/other/requested-pagination';

export class PaginationParams {

  static createTrainingsPaginationParams(pagination: RequestedPagination): HttpParams {
    if (pagination) {
      if (pagination.sort) {
        const sort = pagination.sort + ',' + (pagination.sortDir ? pagination.sortDir : 'asc');
        return new HttpParams()
          .set('page', pagination.page.toString())
          .set('size', pagination.size.toString())
          .set('sort', sort);
      } else {
        return new HttpParams()
          .set('page', pagination.page.toString())
          .set('size', pagination.size.toString());
      }
    }
    return new HttpParams()
      .set('page', '0')
      .set('size', environment.defaultPaginationSize.toString());
  }

  static createSandboxPaginationParams(pagination: RequestedPagination): HttpParams {
    if (pagination) {
      return new HttpParams()
        .set('page', (pagination.page + 1).toString()) // + 1 because PythonAPI pages starts with 1 instead of 0
        .set('page_size', pagination.size.toString());
    }
    return new HttpParams()
      .set('page', '1') // 1 because PythonAPI pages starts with 1 instead of 0
      .set('page_size', environment.defaultPaginationSize.toString());
  }
}
