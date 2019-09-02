import {from, Observable, of} from 'rxjs';

/**
 * Util class to simplify chaining two guards
 */
export class CanActivateToObservable {
  static convert(fromResult: boolean | Promise<boolean> | Observable<boolean>): Observable<boolean> {
    if (fromResult instanceof Observable) {
      return fromResult;
    }
    if (typeof fromResult === 'boolean') {
      return of(fromResult);
    }
    if (fromResult instanceof Promise) {
      return from(fromResult);
    }
  }
}
