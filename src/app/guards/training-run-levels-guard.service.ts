import {ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot} from "@angular/router";
import {TrainingDistractionFreeModeService} from "../services/training-distraction-free-mode.service";
import {Observable} from "rxjs/internal/Observable";
import {Injectable} from "@angular/core";
import {TrainingInstanceGetterService} from "../services/data-getters/training-instance-getter.service";
import {TrainingRunGetterService} from "../services/data-getters/training-run-getter.service";
import {concatMap, map} from "rxjs/operators";
import {TrainingRunLevelComponent} from "../components/trainee/training-run/training-run-level/training-run-level.component";
import {ActiveTrainingRunLevelsService} from "../services/active-training-run-levels.service";
import {TrainingDefinitionGetterService} from "../services/data-getters/training-definition-getter.service";
import {AbstractLevel} from "../model/level/abstract-level";
@Injectable()
/**
 * Guard triggered when accessing training run level. Turns on and off the distraction free mode
 */
export class TrainingRunLevelsGuard implements CanActivate, CanDeactivate<TrainingRunLevelComponent> {

  constructor(private activeTrainingRunLevelService: ActiveTrainingRunLevelsService,
              private distractionFreeModeService: TrainingDistractionFreeModeService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.activeTrainingRunLevelService.getActiveLevels()
      && this.activeTrainingRunLevelService.getActiveLevels().length > 0
      && this.activeTrainingRunLevelService.getActiveLevel()) {
      return true;
    } else {
      this.router.navigate(['not-authorized']);
      return false;
    }
  }

  canDeactivate(component: TrainingRunLevelComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.distractionFreeModeService.setDistractionFreeMode(false);
    this.activeTrainingRunLevelService.clear();
    return true;
  }
}
