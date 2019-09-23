import {TrainingRun} from '../../model/training/training-run';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {TrainingRunFacade} from '../facades/training-run-facade.service';
import {catchError, mergeMap, take} from 'rxjs/operators';
import {TRAINING_RUN_PATH} from '../../paths';
import {Injectable} from '@angular/core';
import {ErrorHandlerService} from '../shared/error-handler.service';

@Injectable()
export class TrainingRunResolver implements Resolve<TrainingRun> {

  constructor(private trainingRunFacade: TrainingRunFacade,
              private errorHandler: ErrorHandlerService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TrainingRun> | Promise<TrainingRun> | TrainingRun {
    if (route.paramMap.has('id')) {
    const id = Number(route.paramMap.get('id'));
      return this.trainingRunFacade.getById(id)
        .pipe(
          take(1),
          mergeMap(tr => tr ? of(tr) : this.navigateToOverview()),
          catchError(err => {
            this.errorHandler.displayInAlert(err, 'Training run resolver');
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
