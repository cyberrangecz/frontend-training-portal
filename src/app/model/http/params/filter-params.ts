import {HttpParams} from '@angular/common/http';
import {KypoFilter} from 'kypo-common';

/**
 * Class transforming filters to http params in server supported format
 */
export class FilterParams {
  /**
   * Transforms filters to http params in server supported format
   * @param filters filters to transform into http params
   */
  static create(filters: KypoFilter[]): HttpParams {
    let params = new HttpParams();
    filters.forEach(filter => params = params.set(filter.paramName, filter.value));
    return params;
  }
}
