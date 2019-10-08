import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {TrainingInstance} from '../../model/training/training-instance';
import {Injectable} from '@angular/core';
import {EMPTY, Observable, of} from 'rxjs';
import {TrainingInstanceFacade} from '../facades/training-instance-facade.service';
import {catchError, mergeMap, take, tap} from 'rxjs/operators';
import {TRAINING_INSTANCE_PATH} from '../../paths';
import {ActiveTrainingInstanceService} from '../training-instance/active-training-instance.service';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {TRAINING_INSTANCE_NEW_PATH} from '../../components/training-instance/training-instance-overview/paths';

@Injectable()
export class TrainingInstanceResolver implements Resolve<TrainingInstance> {

  constructor(private trainingInstanceFacade: TrainingInstanceFacade,
              private activeTrainingInstance: ActiveTrainingInstanceService,
              private errorHandler: ErrorHandlerService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TrainingInstance> | Promise<TrainingInstance> | TrainingInstance {
    if (state.url.endsWith(`${TRAINING_INSTANCE_PATH}/${TRAINING_INSTANCE_NEW_PATH}`)) {
      return null;
    } else if (route.paramMap.has('id')) {
      const id = Number(route.paramMap.get('id'));
      const activeTI = this.activeTrainingInstance.get();
      if (activeTI && activeTI.id === id) {
        return activeTI;
      } else {
        return this.trainingInstanceFacade.getById(id)
          .pipe(
            take(1),
            mergeMap(ti => ti ? of(ti) : this.navigateToNew()
            ),
            tap(ti => this.activeTrainingInstance.setActiveTrainingInstance(ti)),
            catchError(err => {
              this.errorHandler.display(err, 'Training instance resolver');
              this.navigateToNew();
              return EMPTY;
            })
          );
      }
    }
    return this.navigateToNew();
  }

  private navigateToNew(): Observable<never> {
    this.router.navigate([TRAINING_INSTANCE_NEW_PATH]);
    return EMPTY;
  }
}
