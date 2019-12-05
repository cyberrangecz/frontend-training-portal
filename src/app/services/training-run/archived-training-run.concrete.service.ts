import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { Pagination } from 'kypo2-table';
import { TrainingRunTableRow } from '../../model/table/row/training-run-table-row';
import { PaginatedResource } from '../../model/table/other/paginated-resource';
import { TrainingRunFacade } from '../facades/training-run-facade.service';
import { TrainingInstanceFacade } from '../facades/training-instance-facade.service';
import { RequestedPagination } from '../../model/DTOs/other/requested-pagination';
import { tap, switchMap } from 'rxjs/operators';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { environment } from '../../../environments/environment';
import { ArchivedTrainingRunPollingService } from './archived-training-run-polling.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../shared/alert.service';
import {TrainingInstance} from '../../model/training/training-instance';

@Injectable()
export class ArchivedTrainingRunConcreteService extends ArchivedTrainingRunPollingService {
  private archivedTrainingRunsSubject: BehaviorSubject<
    PaginatedResource<TrainingRunTableRow[]>
  > = new BehaviorSubject(this.initSubject());
  archivedTrainingRuns$: Observable<PaginatedResource<TrainingRunTableRow[]>>;

  lastPagination: RequestedPagination;

  constructor(
    private trainingRunFacade: TrainingRunFacade,
    private trainingInstanceFacade: TrainingInstanceFacade,
    private alertService: AlertService,
    private errorHandler: ErrorHandlerService
  ) {
    super();
  }

  startPolling(trainingInstance: TrainingInstance) {
    this.lastTrainingInstanceId = trainingInstance.id;
    this.archivedTrainingRuns$ = merge(
      this.createPoll(),
      this.archivedTrainingRunsSubject.asObservable()
    ).pipe(
      tap(paginatedRuns =>
        this.totalLengthSubject.next(paginatedRuns.pagination.totalElements)
      )
    );
  }

  getAll(
    trainingInstanceId: number,
    pagination?: RequestedPagination
  ): Observable<PaginatedResource<TrainingRunTableRow[]>> {
    this.lastPagination = pagination;
    this.onManualGetAll(trainingInstanceId, pagination);
    return this.trainingInstanceFacade
      .getAssociatedTrainingRunsPaginated(trainingInstanceId, pagination, false)
      .pipe(
        tap(
          runs => {
            this.archivedTrainingRunsSubject.next(runs);
            this.totalLengthSubject.next(runs.pagination.totalElements);
          },
          err => this.onGetAllError(err)
        )
      );
  }

  delete(id: number): Observable<PaginatedResource<TrainingRunTableRow[]>> {
    return this.trainingRunFacade.delete(id).pipe(
      tap({
        error: err => this.errorHandler.display(err, 'Deleting training run')
      }),
      switchMap(() => this.getAll(this.lastTrainingInstanceId, this.lastPagination))
    );
  }

  deleteMultiple(idsToDelete: number[]): Observable<any> {
    return this.trainingRunFacade
      .deleteMultiple(idsToDelete)
      .pipe(
        tap({
          error: err => this.errorHandler.display(err, 'Deleting training runs')
        }),
        switchMap(() => this.getAll(this.lastTrainingInstanceId, this.lastPagination))
      );
  }

  private initSubject(): PaginatedResource<TrainingRunTableRow[]> {
    return new PaginatedResource(
      [],
      new Pagination(0, 0, environment.defaultPaginationSize, 0, 0)
    );
  }

  protected repeatLastGetAllRequest(): Observable<
    PaginatedResource<TrainingRunTableRow[]>
  > {
    this.hasErrorSubject$.next(false);
    return this.trainingInstanceFacade
      .getAssociatedTrainingRunsPaginated(
        this.lastTrainingInstanceId,
        this.lastPagination,
        false
      )
      .pipe(tap({ error: err => this.onGetAllError(err) }));
  }

  private onGetAllError(err: HttpErrorResponse) {
    this.errorHandler.display(err, 'Fetching archived training runs');
    this.hasErrorSubject$.next(true);
  }
}
