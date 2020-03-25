import {Injectable} from '@angular/core';
import {merge, Observable} from 'rxjs';
import {KypoPaginatedResource} from 'kypo-common';
import {Request} from '../../../../model/sandbox/pool/request/request';
import {tap} from 'rxjs/operators';
import {SandboxInstanceApi} from '../../../api/sandbox-instance-api.service';
import {ErrorHandlerService} from '../../../shared/error-handler.service';
import {KypoRequestedPagination} from 'kypo-common';
import {HttpErrorResponse} from '@angular/common/http';
import {PoolCleanupRequestsPollingService} from './pool-cleanup-requests-polling.service';

/**
 * Basic implementation of a layer between a component and an API service.
 * Can manually get cleanup requests, poll them and perform various operations to modify them.
 */
@Injectable()
export class PoolCleanupRequestsConcreteService extends PoolCleanupRequestsPollingService {

  /**
   * List of cleanup requests with currently selected pagination options
   */
  resource$: Observable<KypoPaginatedResource<Request>>;

  constructor(private sandboxInstanceFacade: SandboxInstanceApi,
              private errorHandler: ErrorHandlerService) {
    super();
    this.resource$ = merge(this.poll$, this.resourceSubject$.asObservable());
  }

  /**
   * Gets all cleanup requests with passed pagination and updates related observables or handles an error
   * @param poolId id of a pool associated with cleanup requests
   * @param pagination requested pagination
   */
  getAll(poolId: number, pagination: KypoRequestedPagination): Observable<KypoPaginatedResource<Request>> {
    this.onManualGetAll(poolId, pagination);
    return this.sandboxInstanceFacade.getCleanupRequests(poolId, pagination)
      .pipe(
        tap(
          paginatedRequests => this.resourceSubject$.next(paginatedRequests),
          err => this.onGetAllError(err)
        )
      );
  }

  /**
   * Repeats last get all request for polling purposes
   */
  protected repeatLastGetAllRequest(): Observable<KypoPaginatedResource<Request>> {
    this.hasErrorSubject$.next(false);
    return this.sandboxInstanceFacade.getCleanupRequests(this.lastPoolId, this.lastPagination)
      .pipe(
        tap({ error: err => this.onGetAllError(err)})
      );
  }

  private onGetAllError(err: HttpErrorResponse) {
    this.errorHandler.emit(err, 'Fetching cleanup requests');
    this.hasErrorSubject$.next(true);
  }
}
