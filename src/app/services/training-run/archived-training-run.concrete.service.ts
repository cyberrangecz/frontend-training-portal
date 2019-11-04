import { Injectable } from '@angular/core';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {Pagination} from 'kypo2-table';
import {TrainingRunTableRow} from '../../model/table-adapters/training-run-table-row';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {TrainingRunFacade} from '../facades/training-run-facade.service';
import {TrainingInstanceFacade} from '../facades/training-instance-facade.service';
import {RequestedPagination} from '../../model/DTOs/other/requested-pagination';
import {tap} from 'rxjs/operators';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {environment} from '../../../environments/environment';
import {ArchivedTrainingRunPollingService} from './archived-training-run-polling.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ActiveTrainingInstanceService} from '../training-instance/active-training-instance.service';
import {TrainingInstance} from '../../model/training/training-instance';

@Injectable()
export class ArchivedTrainingRunConcreteService extends ArchivedTrainingRunPollingService {

  private archivedTrainingRunsSubject: BehaviorSubject<PaginatedResource<TrainingRunTableRow[]>> = new BehaviorSubject(this.initSubject());
  archivedTrainingRuns$: Observable<PaginatedResource<TrainingRunTableRow[]>>;

  trainingInstance: TrainingInstance;

  constructor(
    private activeTrainingInstanceService: ActiveTrainingInstanceService,
    private trainingRunFacade: TrainingRunFacade,
    private trainingInstanceFacade: TrainingInstanceFacade,
    private errorHandler: ErrorHandlerService) {
      super();
      this.trainingInstance = activeTrainingInstanceService.get();
      this.archivedTrainingRuns$ = merge(this.archivedTrainingRunPoll$, this.archivedTrainingRunsSubject.asObservable())
        .pipe(
          tap(
            paginatedRuns => this.totalLengthSubject.next(paginatedRuns.pagination.totalElements)
          )
        );
  }

  getAll(trainingInstanceId: number, pagination?: RequestedPagination): Observable<PaginatedResource<TrainingRunTableRow[]>> {
    this.onManualGetAll(trainingInstanceId, pagination);
    return this.trainingInstanceFacade.getAssociatedTrainingRunsPaginated(trainingInstanceId, pagination, false)
      .pipe(
        tap(runs => {
          this.archivedTrainingRunsSubject.next(runs);
          this.totalLengthSubject.next(runs.pagination.totalElements);
        },
          err => this.onGetAllError(err)
        )
      );
  }

  delete(id: number): Observable<any> {
    return this.trainingRunFacade.delete(id)
      .pipe(
        tap({error: err => this.errorHandler.display(err, 'Deleting training runs')})
      );
  }

  deleteMultiple(idsToDelete: number[]): Observable<any> {
    return this.trainingRunFacade.deleteMultiple(idsToDelete)
      .pipe(
        tap({error: err => this.errorHandler.display(err, 'Deleting training runs')})
      );
  }

  private initSubject(): PaginatedResource<TrainingRunTableRow[]> {
    return new PaginatedResource([], new Pagination(0, 0, environment.defaultPaginationSize, 0, 0));
  }

  protected repeatLastGetAllRequest(): Observable<PaginatedResource<TrainingRunTableRow[]>> {
    this.hasErrorSubject$.next(false);
    return this.trainingInstanceFacade.getAssociatedTrainingRunsPaginated(this.lastTrainingInstanceId, this.lastPagination)
      .pipe(
        tap({ error: err => this.onGetAllError(err)})
      );
  }

  private onGetAllError(err: HttpErrorResponse) {
    this.errorHandler.display(err, 'Fetching archived training runs');
    this.hasErrorSubject$.next(true);
  }
}
