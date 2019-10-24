import {Injectable} from '@angular/core';
import {
  BehaviorSubject,
  merge,
  Observable,
} from 'rxjs';
import {
  switchMap,
  tap
} from 'rxjs/operators';
import {PoolRequest} from '../../../model/sandbox/pool/request/pool-request';
import {PaginatedResource} from '../../../model/table-adapters/paginated-resource';
import {SandboxInstanceFacade} from '../../facades/sandbox-instance-facade.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {RequestedPagination} from '../../../model/DTOs/other/requested-pagination';
import {Pagination} from 'kypo2-table';
import {environment} from '../../../../environments/environment';
import {HttpErrorResponse} from '@angular/common/http';
import {PoolRequestPollingService} from './pool-request-polling.service';

@Injectable()
export class PoolCreationRequestsPollingService extends PoolRequestPollingService {

  private manuallyUpdatedRequests$: BehaviorSubject<PaginatedResource<PoolRequest[]>> = new BehaviorSubject(this.initSubject());
  requests$: Observable<PaginatedResource<PoolRequest[]>>;

  constructor(private sandboxInstanceFacade: SandboxInstanceFacade,
              private errorHandler: ErrorHandlerService) {
    super();
    this.requests$ = merge(this.poll$, this.manuallyUpdatedRequests$.asObservable())
      .pipe(
        tap(paginatedRequests => this.totalLengthSubject.next(paginatedRequests.pagination.totalElements))
      );
  }

  getAll(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<PoolRequest[]>> {
    this.onManualGetAll(poolId, pagination);
    return this.sandboxInstanceFacade.getCreationRequests(poolId, pagination)
      .pipe(
        tap(
          paginatedRequests => this.manuallyUpdatedRequests$.next(paginatedRequests),
          err => this.onGetAllError(err)
        )
      );
  }

  cancel(poolId: number, request: PoolRequest): Observable<any> {
    return this.sandboxInstanceFacade.cancelCreationRequest(poolId, request.id)
      .pipe(
        tap({ error: err => this.errorHandler.display(err, 'Canceling creation request')}),
        switchMap(_ => this.getAll(poolId, this.lastPagination))
      );
  }

  retry(poolId: number, request: PoolRequest): Observable<any> {
    return this.sandboxInstanceFacade.retryCreationRequest(poolId, request.id)
      .pipe(
        tap({ error: err => this.errorHandler.display(err, 'Canceling creation request')}),
        switchMap(_ => this.getAll(poolId, this.lastPagination))
      );
  }

  protected repeatLastGetAllRequest(): Observable<PaginatedResource<PoolRequest[]>> {
    this.hasErrorSubject$.next(false);
    return this.sandboxInstanceFacade.getCreationRequests(this.lastPoolId, this.lastPagination)
      .pipe(
        tap({ error: err => this.onGetAllError(err)})
      );
  }

  private onGetAllError(err: HttpErrorResponse) {
    this.errorHandler.display(err, 'Fetching creation requests');
    this.hasErrorSubject$.next(true);
  }

  private initSubject(): PaginatedResource<PoolRequest[]> {
    return new PaginatedResource([], new Pagination(0, 0, environment.defaultPaginationSize, 0, 0));
  }
}
