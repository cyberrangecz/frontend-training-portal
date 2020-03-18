import {PoolAssignService} from './pool-assign.service';
import {TrainingInstance} from '../../../model/training/training-instance';
import {BehaviorSubject, Observable} from 'rxjs';
import {SandboxPool} from '../../../model/sandbox/pool/sandbox-pool';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {SandboxInstanceApi} from '../../api/sandbox-instance-api.service';
import {tap} from 'rxjs/operators';
import {TrainingInstanceApi} from '../../api/training-instance-api.service';
import {AlertService} from '../../shared/alert.service';
import {AlertTypeEnum} from '../../../model/enums/alert-type.enum';
import {Injectable} from '@angular/core';
import {KypoPaginatedResource, KypoRequestedPagination} from 'kypo-common';

@Injectable()
export class PoolAssignConcreteService extends PoolAssignService {

  private lastPagination: KypoRequestedPagination;

  constructor(private errorHandler: ErrorHandlerService,
              private alertService: AlertService,
              private trainingInstanceApi: TrainingInstanceApi,
              private sandboxInstanceApi: SandboxInstanceApi) {
    super();
  }

  init(trainingInstance: TrainingInstance) {
    this.assignedPoolSubject$.next(trainingInstance.poolId);
  }

  getAll(requestedPagination: KypoRequestedPagination): Observable<KypoPaginatedResource<SandboxPool>> {
    this.lastPagination = requestedPagination;
    this.isLoadingSubject$.next(true);
    this.hasErrorSubject$.next(false);
    return this.sandboxInstanceApi.getPools(requestedPagination)
      .pipe(
        tap(pools => {
          this.resourceSubject$.next(pools);
          this.isLoadingSubject$.next(false);
        },
          err => {
          this.isLoadingSubject$.next(false);
          this.hasErrorSubject$.next(true);
          })
      );
  }

  assign(trainingInstance: TrainingInstance): Observable<any> {
    const poolId = this.selectedSubject$.getValue().id;
    return this.trainingInstanceApi.assignPool(trainingInstance.id, poolId)
      .pipe(
        tap(_ => {
          this.alertService.emitAlert(AlertTypeEnum.Success, `Pool ${poolId} was assigned`);
          this.assignedPoolSubject$.next(poolId);
          },
            err => this.errorHandler.emit(err, `Assigning pool ${poolId}`))
      );
  }

  unassign(trainingInstance: TrainingInstance): Observable<any> {
    return this.trainingInstanceApi.unassignPool(trainingInstance.id)
      .pipe(
        tap(_ => {
          this.alertService.emitAlert(AlertTypeEnum.Success, `Pool was unassigned`);
            this.assignedPoolSubject$.next(undefined);
          },
          err => this.errorHandler.emit(err, `Unassigning pool`))
      );
  }
}
