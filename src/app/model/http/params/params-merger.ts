import {HttpParams} from '@angular/common/http';

/**
 * Util class merging multiple http params into one http params object
 */
export class ParamsMerger {
  /**
   * Merges multiple http params into one http params object
   * @param params list of http params object to be merged
   */
  static merge(params: HttpParams[]): HttpParams {
    let resultParams = new HttpParams();
    params.forEach(param =>
      param.keys().forEach(key =>
        resultParams = resultParams.set(key, param.get(key))
      )
    );
    return resultParams;
  }
}
