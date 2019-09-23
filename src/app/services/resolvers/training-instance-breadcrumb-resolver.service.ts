import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {TrainingInstanceFacade} from '../facades/training-instance-facade.service';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, mergeMap, take} from 'rxjs/operators';
import {TRAINING_INSTANCE_PATH} from '../../paths';
import {ActiveTrainingInstanceService} from '../training-instance/active-training-instance.service';
import {ErrorHandlerService} from '../shared/error-handler.service';

@Injectable()
export class TrainingInstanceBreadcrumbResolver implements Resolve<string> {

  constructor(private trainingInstanceFacade: TrainingInstanceFacade,
              private activeTrainingInstance: ActiveTrainingInstanceService,
              private errorHandler: ErrorHandlerService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    if (route.paramMap.has('id')) {
      const id = Number(route.paramMap.get('id'));
      const activeTI = this.activeTrainingInstance.get();
      if (activeTI && activeTI.id === id) {
        return activeTI.title;
      } else {
        return this.trainingInstanceFacade.getById(id)
          .pipe(
            take(1),
            mergeMap(ti => ti ? of(ti.title) : this.navigateToOverview()),
            catchError(err => {
              this.errorHandler.displayInAlert(err, 'Training instance breadcrumbs resolver');
              return EMPTY;
            })
          );
      }
    }
    return this.navigateToOverview();
  }

  private navigateToOverview(): Observable<never> {
    this.router.navigate([TRAINING_INSTANCE_PATH]);
    return EMPTY;
  }
}
