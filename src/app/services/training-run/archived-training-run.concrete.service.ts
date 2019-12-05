import { Injectable } from '@angular/core';
import {BehaviorSubject, merge, Observable, Subject, timer} from 'rxjs';
import { Pagination } from 'kypo2-table';
import { TrainingRunTableRow } from '../../model/table/row/training-run-table-row';
import { PaginatedResource } from '../../model/table/other/paginated-resource';
import { TrainingRunFacade } from '../facades/training-run-facade.service';
import { TrainingInstanceFacade } from '../facades/training-instance-facade.service';
import { RequestedPagination } from '../../model/DTOs/other/requested-pagination';
import {tap, switchMap, retryWhen} from 'rxjs/operators';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { environment } from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../shared/alert.service';
import {TrainingInstance} from '../../model/training/training-instance';
import {ArchivedTrainingRunService} from '../shared/archived-training-run.service';

@Injectable()
export class ArchivedTrainingRunConcreteService extends ArchivedTrainingRunService {

  private lastPagination: RequestedPagination;
  private retryPolling$: Subject<boolean> = new Subject();
  private manuallyUpdated$: BehaviorSubject<PaginatedResource<TrainingRunTableRow[]>> = new BehaviorSubject(this.initSubject());
  trainingInstance: TrainingInstance;

  archivedTrainingRuns$: Observable<PaginatedResource<TrainingRunTableRow[]>>;

  constructor(
    private trainingRunFacade: TrainingRunFacade,
    private trainingInstanceFacade: TrainingInstanceFacade,
    private alertService: AlertService,
    private errorHandler: ErrorHandlerService
  ) {
    super();
  }

  startPolling(trainingInstance: TrainingInstance) {
    this.trainingInstance = trainingInstance;
    this.lastPagination = new RequestedPagination(0, environment.defaultPaginationSize, '', '');
    const poll$ = this.createPoll();
    this.archivedTrainingRuns$ = merge(poll$, this.manuallyUpdated$.asObservable())
      .pipe(
        tap(
          paginatedRuns => this.totalLengthSubject.next(paginatedRuns.pagination.totalElements)
        )
      );
  }

  getAll(trainingInstanceId: number, pagination: RequestedPagination): Observable<PaginatedResource<TrainingRunTableRow[]>> {
    this.onManualGetAll(pagination);
    return this.trainingInstanceFacade
      .getAssociatedTrainingRunsPaginated(trainingInstanceId, pagination, false)
      .pipe(
        tap(
          runs => {
            this.manuallyUpdated$.next(runs);
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
      switchMap(() => this.getAll(this.trainingInstance.id, this.lastPagination))
    );
  }

  deleteMultiple(idsToDelete: number[]): Observable<any> {
    return this.trainingRunFacade.deleteMultiple(idsToDelete)
      .pipe(
        tap({
          error: err => this.errorHandler.display(err, 'Deleting training runs')
        }),
        switchMap(() => this.getAll(this.trainingInstance.id, this.lastPagination))
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
        this.trainingInstance.id,
        this.lastPagination,
        false
      )
      .pipe(tap({ error: err => this.onGetAllError(err) }));
  }

  private onGetAllError(err: HttpErrorResponse) {
    this.errorHandler.display(err, 'Fetching archived training runs');
    this.hasErrorSubject$.next(true);
  }

  protected createPoll(): Observable<PaginatedResource<TrainingRunTableRow[]>> {
    return timer(0, environment.organizerSummaryPollingPeriod)
      .pipe(
        switchMap( _ => this.repeatLastGetAllRequest()),
        retryWhen(_ => this.retryPolling$)
      );
  }

  protected onManualGetAll(pagination: RequestedPagination) {
    this.lastPagination = pagination;
    if (this.hasErrorSubject$.getValue()) {
      this.retryPolling$.next(true);
    }
    this.hasErrorSubject$.next(false);
  }
}
