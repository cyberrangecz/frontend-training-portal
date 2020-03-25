import {Injectable} from '@angular/core';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {Request} from '../../../../model/sandbox/pool/request/request';
import {KypoPaginatedResource, KypoRequestedPagination} from 'kypo-common';
import {SandboxInstanceApi} from '../../../api/sandbox-instance-api.service';
import {ErrorHandlerService} from '../../../shared/error-handler.service';
import {HttpErrorResponse} from '@angular/common/http';
import {PoolAllocationRequestsPollingService} from './pool-allocation-requests-polling.service';
import {AlertService} from '../../../shared/alert.service';
import {AlertTypeEnum} from '../../../../model/enums/alert-type.enum';

/**
 * Basic implementation of a layer between a component and an API service.
 * Can manually get creation requests, poll them and perform various operations to modify them.
 */
@Injectable()
export class PoolAllocationRequestsConcreteService extends PoolAllocationRequestsPollingService {

  private manuallyUpdatedRequests$: BehaviorSubject<KypoPaginatedResource<Request>> = new BehaviorSubject(this.initSubject());

  constructor(private api: SandboxInstanceApi,
              private alertService: AlertService,
              private errorHandler: ErrorHandlerService) {
    super();
    this.resource$ = merge(this.poll$, this.manuallyUpdatedRequests$.asObservable());
  }

  /**
   * Gets all allocation requests with passed pagination and updates related observables or handles an error
   * @param poolId id of a pool associated with allocation requests
   * @param pagination requested pagination
   */
  getAll(poolId: number, pagination: KypoRequestedPagination): Observable<KypoPaginatedResource<Request>> {
    this.onManualGetAll(poolId, pagination);
    return this.api.getAllocationRequests(poolId, pagination)
      .pipe(
        tap(
          paginatedRequests => this.manuallyUpdatedRequests$.next(paginatedRequests),
          err => this.onGetAllError(err)
        )
      );
  }

  /**
   * Cancels an allocation request, informs about the result and updates list of requests or handles an error
   * @param request a request to be cancelled
   */
  cancel(request: Request): Observable<any> {
    return this.api.cancelAllocationRequest(request.allocationUnitId, request.id)
      .pipe(
        tap( _ => this.alertService.emitAlert(AlertTypeEnum.Success, `Allocation request ${request.id} cancelled`),
            err => this.errorHandler.emit(err, 'Cancelling allocation request ' + request.id)),
        switchMap(_ => this.getAll(this.lastPoolId, this.lastPagination))
      );
  }

  /**
   * Creates a cleanup request, informs about the result and updates list of requests or handles an error
   * @param request a request to be deleted
   */
  delete(request: Request): Observable<any> {
    return this.api.createCleanupRequest(request.allocationUnitId)
      .pipe(
        tap( _ => this.alertService.emitAlert(AlertTypeEnum.Success, `Created cleanup request`),
          err => this.errorHandler.emit(err, 'Creating cleanup request')),
        switchMap(_ => this.getAll(this.lastPoolId, this.lastPagination))
      );
  }


  /**
   * Repeats last get all request for polling purposes
   */
  protected repeatLastGetAllRequest(): Observable<KypoPaginatedResource<Request>> {
    this.hasErrorSubject$.next(false);
    return this.api.getAllocationRequests(this.lastPoolId, this.lastPagination)
      .pipe(
        tap({ error: err => this.onGetAllError(err)})
      );
  }

  private onGetAllError(err: HttpErrorResponse) {
    this.errorHandler.emit(err, 'Fetching allocation requests');
    this.hasErrorSubject$.next(true);
  }
}
