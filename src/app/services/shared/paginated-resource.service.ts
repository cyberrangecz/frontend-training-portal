import {BehaviorSubject, Observable} from 'rxjs';

/**
 * Contains subjects and observables typically used when handling paginated data
 */
export abstract class PaginatedResourceService {
  /**
   * Total length of a resource (how many there are in total)
   * Change internally in extending service. Client should subscribe to the observable
   */
  protected totalLengthSubject$: BehaviorSubject<number> = new BehaviorSubject(0);
  /**
   * Total length of a resource (how many there are in total)
   * @contract must be updated every time new data are received
   */
  totalLength$: Observable<number> = this.totalLengthSubject$.asObservable();

  /**
   * True if server returned error response on the latest request, false otherwise
   * Change internally in extending service. Client should subscribe to the observable
   */
  protected hasErrorSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  /**
   * True if server returned error response on the latest request, false otherwise
   * @contract must be updated every time new data are received
   */
  hasError$: Observable<boolean> = this.hasErrorSubject$.asObservable();

  /**
   * True if response to the latest request was not yet received
   * Change internally in extending service. Client should subscribe to the observable
   */
  protected isLoadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  /**
   * True if response to the latest request was not yet received
   * @contract must be updated every time new data are received
   */
  isLoading$: Observable<boolean> = this.isLoadingSubject$.asObservable();
}
