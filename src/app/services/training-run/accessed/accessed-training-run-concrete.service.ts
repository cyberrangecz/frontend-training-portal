import {Injectable} from '@angular/core';
import {AccessedTrainingRunService} from './accessed-training-run.service';
import {KypoRequestedPagination} from 'kypo-common';
import {TrainingRunApi} from '../../api/training-run-api.service';
import {from, Observable} from 'rxjs';
import {AccessedTrainingRun} from '../../../model/table/rows/accessed-training-run';
import {tap} from 'rxjs/operators';
import {KypoPaginatedResource} from 'kypo-common';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {Router} from '@angular/router';
import {RouteFactory} from '../../../model/routes/route-factory';
import {environment} from '../../../../environments/environment';

/**
 * Basic implementation of layer between component and API service.
 */
@Injectable()
export class AccessedTrainingRunConcreteService extends AccessedTrainingRunService {

  constructor(private api: TrainingRunApi,
              private router: Router,
              private errorHandler: ErrorHandlerService) {
    super(environment.defaultPaginationSize);
  }

  /**
   * Gets paginated accessed training runs and updates related observables or handles error.
   * @param pagination requested pagination info
   */
  getAll(pagination: KypoRequestedPagination): Observable<KypoPaginatedResource<AccessedTrainingRun>> {
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
