import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, mergeMap, take} from 'rxjs/operators';
import {
  TRAINING_INSTANCE_EDIT_PATH,
  TRAINING_INSTANCE_NEW_PATH
} from '../../components/training-instance/training-instance-overview/paths';
import {RouteFactory} from '../../model/routes/route-factory';
import {TrainingInstanceFacade} from '../facades/training-instance-facade.service';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {ActiveTrainingInstanceService} from '../training-instance/active-training-instance.service';
import {TrainingInstance} from '../../model/training/training-instance';
@Injectable()
export class TrainingInstanceBreadcrumbResolver implements Resolve<string> {

  constructor(private trainingInstanceFacade: TrainingInstanceFacade,
              private activeTrainingInstance: ActiveTrainingInstanceService,
              private errorHandler: ErrorHandlerService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    if (state.url.endsWith(TRAINING_INSTANCE_NEW_PATH)) {
      return 'Create';
    } else if (route.paramMap.has('id')) {
      const id = Number(route.paramMap.get('id'));
      const activeTI = this.activeTrainingInstance.get();
      if (activeTI && activeTI.id === id) {
        return activeTI.title;
      } else {
        return this.trainingInstanceFacade.getById(id)
          .pipe(
            take(1),
            mergeMap(ti => ti ? of(this.getBreadcrumbFromTitle(ti, state)) : this.navigateToOverview()),
            catchError(err => {
              this.errorHandler.display(err, 'Training instance breadcrumbs resolver');
              this.navigateToOverview();
              return EMPTY;
            }),
          );
      }
    }
    return EMPTY;
  }

  private navigateToOverview() {
    this.router.navigate([RouteFactory.toTrainingInstanceOverview()]);
    return EMPTY;
  }

  private getBreadcrumbFromTitle(trainingInstance: TrainingInstance, state: RouterStateSnapshot): string {
    return state.url.includes(TRAINING_INSTANCE_EDIT_PATH)
      ? `Edit ${trainingInstance.title}`
      : trainingInstance.title;
  }
}
