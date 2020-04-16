import { from, Observable, of } from 'rxjs';

/**
 * Util class to simplify chaining two guards by narrowing the type to an observable
 */
export class CanActivateToObservable {
  /**
   * Narrows passed result to observable type
   * @param fromResult result to be narrowed
   */
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
