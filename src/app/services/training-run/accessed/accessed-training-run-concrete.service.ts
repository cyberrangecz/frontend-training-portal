import {Injectable} from '@angular/core';
import {AccessedTrainingRunService} from './accessed-training-run.service';
import {RequestedPagination} from 'kypo2-table';
import {TrainingRunApi} from '../../api/training-run-api.service';
import {from, Observable} from 'rxjs';
import {AccessedTrainingRun} from '../../../model/table/rows/accessed-training-run';
import {tap} from 'rxjs/operators';
import {PaginatedResource} from '../../../model/table/other/paginated-resource';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {Router} from '@angular/router';
import {RouteFactory} from '../../../model/routes/route-factory';

/**
 * Basic implementation of layer between component and API service.
 */
@Injectable()
export class AccessedTrainingRunConcreteService extends AccessedTrainingRunService {

  constructor(private api: TrainingRunApi,
              private router: Router,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  /**
   * Gets paginated accessed training runs and updates related observables or handles error.
   * @param pagination requested pagination info
   */
  getAll(pagination: RequestedPagination): Observable<PaginatedResource<AccessedTrainingRun>> {
    this.hasErrorSubject$.next(false);
    return this.api.getAccessed(pagination).pipe(
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
   * @param id id of training run to resume
   */
  resume(id: number): Observable<any> {
    return from(this.router.navigate([RouteFactory.toResumeTrainingRunGame(id)]));
  }

  access(token: string): Observable<any> {
    return from(this.router.navigate([RouteFactory.toAccessTrainingRunGame(token)]));
  }

  results(id: number): Observable<any> {
    return from(this.router.navigate([RouteFactory.toTrainingRunResult(id)]));
  }
}
