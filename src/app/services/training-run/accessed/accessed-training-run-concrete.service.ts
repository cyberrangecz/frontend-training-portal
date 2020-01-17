import { Injectable } from '@angular/core';
import {AccessedTrainingRunService} from './accessed-training-run.service';
import {Pagination, RequestedPagination} from 'kypo2-table';
import {TrainingRunApi} from '../../api/training-run-api.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {AccessedTrainingRun} from '../../../model/table/row/accessed-training-run';
import {tap} from 'rxjs/operators';
import {PaginatedResource} from '../../../model/table/other/paginated-resource';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {environment} from '../../../../environments/environment';

/**
 * Basic implementation of layer between component and API service.
 */
@Injectable()
export class AccessedTrainingRunConcreteService extends AccessedTrainingRunService {

  private trainingRunsSubject: BehaviorSubject<PaginatedResource<AccessedTrainingRun>> = new BehaviorSubject(this.initSubject());
  trainingRuns$: Observable<PaginatedResource<AccessedTrainingRun>> = this.trainingRunsSubject.asObservable();

  constructor(private trainingRunFacade: TrainingRunApi,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  /**
   * Gets paginated accessed training runs and updates related observables or handles error.
   * @param pagination requested pagination info
   */
  getAll(pagination: RequestedPagination): Observable<PaginatedResource<AccessedTrainingRun>> {
    this.hasErrorSubject$.next(false);
    return this.trainingRunFacade.getAccessed(pagination).pipe(
      tap(trainingRuns => {
        this.trainingRunsSubject.next(trainingRuns);
        this.totalLengthSubject$.next(trainingRuns.pagination.totalElements);
      },
        err => {
          this.errorHandler.display(err, 'Fetching training runs');
          this.hasErrorSubject$.next(true);
        })
    );
  }
  /**
   * Resumes in already started training run or handles error.
   * @param trainingRunId id of training run to resume
   */
  resume(trainingRunId: number): Observable<any> {
    return this.trainingRunFacade.resume(trainingRunId).pipe(
     tap({
       error: err => this.errorHandler.display(err, 'Resuming training run')
     })
   );
  }

  private initSubject(): PaginatedResource<AccessedTrainingRun> {
    return new PaginatedResource([], new Pagination(0, 0, environment.defaultPaginationSize, 0, 0));
  }
}
