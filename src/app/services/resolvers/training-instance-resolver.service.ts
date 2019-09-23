import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {TrainingInstance} from '../../model/training/training-instance';
import {Injectable} from '@angular/core';
import {EMPTY, Observable, of} from 'rxjs';
import {TrainingInstanceFacade} from '../facades/training-instance-facade.service';
import {catchError, mergeMap, take, tap} from 'rxjs/operators';
import {TRAINING_DEFINITION_PATH, TRAINING_INSTANCE_PATH} from '../../paths';
import {ActiveTrainingInstanceService} from '../training-instance/active-training-instance.service';
import {ErrorHandlerService} from '../shared/error-handler.service';

@Injectable()
export class TrainingInstanceResolver implements Resolve<TrainingInstance> {

  constructor(private trainingInstanceFacade: TrainingInstanceFacade,
              private activeTrainingInstance: ActiveTrainingInstanceService,
              private errorHandler: ErrorHandlerService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TrainingInstance> | Promise<TrainingInstance> | TrainingInstance {
    if (route.paramMap.has('id')) {
      const id = Number(route.paramMap.get('id'));
      const activeTI = this.activeTrainingInstance.get();
      if (activeTI && activeTI.id === id) {
        return activeTI;
      } else {
        return this.trainingInstanceFacade.getById(id)
          .pipe(
            take(1),
            mergeMap(ti => ti ? of(ti) : this.navigateToOverview()
            ),
            tap(ti => this.activeTrainingInstance.setActiveTrainingInstance(ti)),
            catchError(err => {
              this.errorHandler.displayInAlert(err, 'Training instance resolver');
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
