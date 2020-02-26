import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {AbstractLevelComponent} from '../../components/training-run/training-run-detail/level/abstract-level.component';
import {TRAINING_RUN_PATH} from '../../paths';
import {RunningTrainingRunService} from '../training-run/running/running-training-run.service';

@Injectable()
/**
 * Route guard determining if distraction free (gaming) mode should be turned on or off.
 */
export class TrainingRunLevelsGuard implements CanActivate, CanDeactivate<AbstractLevelComponent> {

  constructor(private activeTrainingRunLevelService: RunningTrainingRunService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.activeTrainingRunLevelService.getLevels()
      && this.activeTrainingRunLevelService.getLevels().length > 0
      && this.activeTrainingRunLevelService.getActiveLevel()) {
      return true;
    } else {
      this.router.navigate([TRAINING_RUN_PATH]);
    }
  }

  canDeactivate(component: AbstractLevelComponent, currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.activeTrainingRunLevelService.clear();
    return true;
  }
}
