import {TrainingRun} from '../../model/training/training-run';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {TrainingRunApi} from '../api/training-run-api.service';
import {catchError, mergeMap, take} from 'rxjs/operators';
import {RouteFactory} from '../../model/routes/route-factory';
import {TRAINING_RUN_RESULTS_SELECTOR} from '../../components/training-run/training-run-overview/paths';

@Injectable()
export class TrainingRunResultsResolver implements Resolve<TrainingRun> {

  constructor(private api: TrainingRunApi,
              private errorHandler: ErrorHandlerService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TrainingRun> | Promise<TrainingRun> | TrainingRun {
   if (route.paramMap.has(TRAINING_RUN_RESULTS_SELECTOR)) {
      const id = Number(route.paramMap.get(TRAINING_RUN_RESULTS_SELECTOR));
      return this.api.get(id)
        .pipe(
          take(1),
          mergeMap(tr => tr ? of(tr) : this.navigateToOverview()),
          catchError(err => {
            this.errorHandler.emit(err, 'Training run results');
            this.navigateToOverview();
            return EMPTY;
          })
        );
    }
    return this.navigateToOverview();
  }

  private navigateToOverview(): Observable<never> {
    this.router.navigate([RouteFactory.toTrainingRunOverview()]);
    return EMPTY;
  }
}

