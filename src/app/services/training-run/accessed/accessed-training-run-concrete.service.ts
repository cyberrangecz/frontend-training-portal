import {Injectable} from '@angular/core';
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
        this.resourceSubject$.next(trainingRuns);
      },
        err => {
          this.errorHandler.emit(err, 'Fetching training runs');
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
       error: err => this.errorHandler.emit(err, 'Resuming training run')
     })
   );
  }
}
