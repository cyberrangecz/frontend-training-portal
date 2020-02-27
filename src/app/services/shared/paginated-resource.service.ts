import {BehaviorSubject, Observable} from 'rxjs';
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {environment} from '../../../environments/environment';
import {Pagination} from '../../model/table/other/pagination';

/**
 * Contains subjects and observables typically used when handling paginated data.
 * Subscribe to elements$ to receive latest data updates.
 */
export abstract class PaginatedResourceService<T> {

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

  /**
   * Paginated resource containing pagination info and retrieved elements of generic type. Change internally in extending service.
   * Client should subscribe to the observable
   * @contract must be updated every time new data are received
   */
  protected resourceSubject$: BehaviorSubject<PaginatedResource<T>> = new BehaviorSubject(this.initSubject());

  /**
   * Paginated resource containing pagination info and retrieved elements of generic type. Change internally in extending service.
   * Client should subscribe to the observable
   * @contract must be updated every time new data are received
   */
  resource$: Observable<PaginatedResource<T>> = this.resourceSubject$.asObservable();


  private initSubject(): PaginatedResource<T> {
    return new PaginatedResource([], new Pagination(0, 0, environment.defaultPaginationSize, 0, 0));
  }
}
