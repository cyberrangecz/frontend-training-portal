import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {AbstractLevelComponent} from '../../components/training-run/training-run-detail/level/abstract-level.component';
import {TRAINING_RUN_PATH} from '../../paths';
import {DistractionFreeModeService} from '../shared/distraction-free-mode.service';
import {ActiveTrainingRunService} from '../training-run/active-training-run.service';
@Injectable()
/**
 * Guard triggered when accessing training run level. Turns on and off the distraction free mode
 */
export class TrainingRunLevelsGuard implements CanActivate, CanDeactivate<AbstractLevelComponent> {

  constructor(private activeTrainingRunLevelService: ActiveTrainingRunService,
              private distractionFreeModeService: DistractionFreeModeService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.activeTrainingRunLevelService.getLevels()
      && this.activeTrainingRunLevelService.getLevels().length > 0
      && this.activeTrainingRunLevelService.getActiveLevel()) {
      this.distractionFreeModeService.setDistractionFreeMode(true);
      return true;
    } else {
      this.router.navigate([TRAINING_RUN_PATH]);
    }
  }

  canDeactivate(component: AbstractLevelComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.distractionFreeModeService.setDistractionFreeMode(false);
    this.activeTrainingRunLevelService.clear();
    return true;
  }
}
