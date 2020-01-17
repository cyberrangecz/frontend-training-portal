import {HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {RequestedPagination} from '../../DTOs/other/requested-pagination';

/**
 * Class transforming requested pagination object to http params into microservice supported format
 */
export class PaginationParams {

  /**
   * Transforms requested pagination object to http params in trainings microservice format (JAVA API)
   * @param pagination requested pagination
   */
  static forJavaAPI(pagination: RequestedPagination): HttpParams {
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

  /**
   * Transforms requested pagination object to http params in sandbox microservice format (PYTHON API)
   * @param pagination requested pagination
   */
  static forDjangoAPI(pagination: RequestedPagination): HttpParams {
    if (pagination) {
      return new HttpParams()
        .set('page', (pagination.page + 1).toString()) // + 1 because sandbox microservice pages starts with 1 instead of 0
        .set('page_size', pagination.size.toString());
    }
    return new HttpParams()
      .set('page', '1') // 1 because sandbox microservice pages starts with 1 instead of 0
      .set('page_size', environment.defaultPaginationSize.toString());
  }
}
