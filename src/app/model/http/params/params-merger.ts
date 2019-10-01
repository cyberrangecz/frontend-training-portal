import {HttpParams} from '@angular/common/http';

export class ParamsMerger {
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
