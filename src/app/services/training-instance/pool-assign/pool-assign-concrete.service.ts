import {PoolAssignService} from './pool-assign.service';
import {TrainingInstance} from '../../../model/training/training-instance';
import {Observable} from 'rxjs';
import {Pool} from 'kypo-sandbox-model';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {tap} from 'rxjs/operators';
import {TrainingInstanceApi} from '../../api/training-instance-api.service';
import {AlertService} from '../../shared/alert.service';
import {AlertTypeEnum} from '../../../model/enums/alert-type.enum';
import {Injectable} from '@angular/core';
import {KypoPaginatedResource, KypoRequestedPagination} from 'kypo-common';
import {PoolApi} from 'kypo-sandbox-api';

@Injectable()
export class PoolAssignConcreteService extends PoolAssignService {

  private lastPagination: KypoRequestedPagination;

  constructor(private errorHandler: ErrorHandlerService,
              private alertService: AlertService,
              private trainingInstanceApi: TrainingInstanceApi,
              private poolApi: PoolApi) {
    super();
  }

  init(trainingInstance: TrainingInstance) {
    this.assignedPoolSubject$.next(trainingInstance.poolId);
  }

  getAll(requestedPagination: KypoRequestedPagination): Observable<KypoPaginatedResource<Pool>> {
    this.lastPagination = requestedPagination;
    this.isLoadingSubject$.next(true);
    this.hasErrorSubject$.next(false);
    return this.poolApi.getPools(requestedPagination)
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
