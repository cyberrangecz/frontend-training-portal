import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, mergeMap, take} from 'rxjs/operators';
import {TrainingRun} from '../../model/training/training-run';
import {TRAINING_RUN_PATH} from '../../paths';
import {TrainingRunApi} from '../api/training-run-api.service';
import {ErrorHandlerService} from '../shared/error-handler.service';


/**
 * Router data provider
 */
@Injectable()
export class TrainingRunResolver implements Resolve<TrainingRun> {

  constructor(private trainingRunFacade: TrainingRunApi,
              private errorHandler: ErrorHandlerService,
              private router: Router) {
  }

  /**
   * Retrieves a specific resource based on id provided in url. Navigates to a resource overview if no resource with such id exists.
   * @param route route snapshot
   * @param state router state snapshot
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TrainingRun> | Promise<TrainingRun> | TrainingRun {
    if (route.paramMap.has('id')) {
    const id = Number(route.paramMap.get('id'));
      return this.trainingRunFacade.get(id)
        .pipe(
          take(1),
          mergeMap(tr => tr ? of(tr) : this.navigateToOverview()),
          catchError(err => {
            this.errorHandler.emit(err, 'Training run resolver');
            this.navigateToOverview();
            return EMPTY;
          })
        );
    }
    return this.navigateToOverview();
  }

  private navigateToOverview(): Observable<never> {
    this.router.navigate([TRAINING_RUN_PATH]);
    return EMPTY;
  }
}
