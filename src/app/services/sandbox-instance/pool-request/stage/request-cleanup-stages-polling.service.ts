import {RequestStagesPollingService} from './request-stages-polling.service';
import {SandboxInstanceApi} from '../../../api/sandbox-instance-api.service';
import {ErrorHandlerService} from '../../../shared/error-handler.service';
import {environment} from '../../../../../environments/environment';
import {Request} from '../../../../model/sandbox/pool/request/request';
import {Observable} from 'rxjs';
import {KypoPaginatedResource, KypoRequestedPagination} from 'kypo-common';
import {RequestStage} from '../../../../model/sandbox/pool/request/stage/request-stage';
import {take, takeWhile, tap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../shared/alert.service';
import {AlertTypeEnum} from '../../../../model/enums/alert-type.enum';
import {RouteFactory} from '../../../../model/routes/route-factory';
import {SANDBOX_POOL_ID_SELECTOR} from '../../../../components/sandbox-instance/sandbox-pool-overview/paths';

@Injectable()
export class RequestCleanupStagesPollingService extends RequestStagesPollingService {

  constructor(private api: SandboxInstanceApi,
              private router: Router,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private errorHandler: ErrorHandlerService) {
    super(environment.defaultPaginationSize);
  }

  /**
   * Gets all stages and updates related observables or handles an error
   * @param request request associated with stages
   */
  getAll(request: Request): Observable<KypoPaginatedResource<RequestStage>> {
    this.onManualGetAll(request);
    const fakePagination = new KypoRequestedPagination(0, 100, '', '');
    return this.api.getCleanupStages(request.allocationUnitId, request.id, fakePagination)
      .pipe(
        tap(
          resource =>  {
            this.resourceSubject$.next(resource);
            this.navigateBackIfStagesFinished(resource);
          },
          err => this.onGetAllError(err)
        )
      );
  }

  protected repeatLastGetAllRequest(): Observable<KypoPaginatedResource<RequestStage>> {
    this.hasErrorSubject$.next(false);
    const fakePagination = new KypoRequestedPagination(0, 100, '', '');
    return this.api.getCleanupStages(this.request.allocationUnitId, this.request.id, fakePagination)
      .pipe(
        tap( resource => this.navigateBackIfStagesFinished(resource),
            err => this.onGetAllError(err))
      );
  }

  private onManualGetAll(request: Request) {
    this.request = request;
    if (this.hasErrorSubject$.getValue()) {
      this.retryPolling$.next(true);
    }
    this.hasErrorSubject$.next(false);
  }

  private onGetAllError(err: HttpErrorResponse) {
    if (err.status === 404) {
      this.alertService.emitAlert(AlertTypeEnum.Info, 'Cleanup request finished. All stages were removed');
      this.navigateBack();
      return;
    }
    this.errorHandler.emit(err, 'Fetching stages');
    this.hasErrorSubject$.next(true);
  }

  private navigateBackIfStagesFinished(resource: KypoPaginatedResource<RequestStage>) {
    if (resource.elements.every(stage => stage.hasFinished())) {
      this.alertService.emitAlert(AlertTypeEnum.Info, 'Cleanup request finished. All stages were removed');
      this.navigateBack();
    }
  }

  private navigateBack() {
    this.route.paramMap
      .pipe(
        take(1)
      ).subscribe(paramMap => {
      if (paramMap.has(SANDBOX_POOL_ID_SELECTOR)) {
        const poolId = Number(paramMap.get(SANDBOX_POOL_ID_SELECTOR));
        return this.router.navigate([RouteFactory.toPool(poolId)]);
      }
      return this.router.navigate([RouteFactory.toPoolOverview()])
    })

  }
}
