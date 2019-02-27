import {ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot} from "@angular/router";
import {TrainingDistractionFreeModeService} from "../services/training-distraction-free-mode.service";
import {Observable} from "rxjs/internal/Observable";
import {Injectable} from "@angular/core";
import {TrainingRunLevelComponent} from "../components/trainee/training-run/training-run-level/training-run-level.component";
import {ActiveTrainingRunService} from "../services/active-training-run.service";
@Injectable()
/**
 * Guard triggered when accessing training run level. Turns on and off the distraction free mode
 */
export class TrainingRunLevelsGuard implements CanActivate, CanDeactivate<TrainingRunLevelComponent> {

  constructor(private activeTrainingRunLevelService: ActiveTrainingRunService,
              private distractionFreeModeService: TrainingDistractionFreeModeService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.activeTrainingRunLevelService.getActiveLevels()
      && this.activeTrainingRunLevelService.getActiveLevels().length > 0
      && this.activeTrainingRunLevelService.getActiveLevel()) {
      this.distractionFreeModeService.setDistractionFreeMode(true);
      return true;
    } else {
      return false;
    }
  }

  canDeactivate(component: TrainingRunLevelComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.distractionFreeModeService.setDistractionFreeMode(false);
    this.activeTrainingRunLevelService.clear();
    return true;
  }
}
