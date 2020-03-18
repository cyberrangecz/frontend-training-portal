import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, mergeMap, take} from 'rxjs/operators';
import {TRAINING_INSTANCE_NEW_PATH} from '../../components/training-instance/training-instance-overview/paths';
import {TrainingInstance} from '../../model/training/training-instance';
import {TRAINING_INSTANCE_PATH} from '../../paths';
import {TrainingInstanceApi} from '../api/training-instance-api.service';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {RouteFactory} from '../../model/routes/route-factory';

/**
 * Router data provider
 */
@Injectable()
export class TrainingInstanceResolver implements Resolve<TrainingInstance> {

  constructor(private api: TrainingInstanceApi,
              private errorHandler: ErrorHandlerService,
              private router: Router) {
  }

  /**
   * Retrieves a specific resource based on id provided in url. Navigates to a resource overview if no resource with such id exists.
   * @param route route snapshot
   * @param state router state snapshot
   */
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<TrainingInstance> | Promise<TrainingInstance> | TrainingInstance {
    if (state.url.endsWith(`${TRAINING_INSTANCE_PATH}/${TRAINING_INSTANCE_NEW_PATH}`)) {
      return null;
    }
    if (route.paramMap.has('id')) {
      const id = Number(route.paramMap.get('id'));
      return this.api.get(id)
        .pipe(
          take(1),
          mergeMap(ti => ti ? of(ti) : this.navigateToNew()),
          catchError(err => {
            this.errorHandler.emit(err, 'Training instance resolver');
            this.navigateToNew();
            return EMPTY;
          })
        );
    }
    return this.navigateToNew();
  }

  private navigateToNew(): Observable<never> {
    this.router.navigate([RouteFactory.toTrainingInstanceOverview()]);
    return EMPTY;
  }
}
