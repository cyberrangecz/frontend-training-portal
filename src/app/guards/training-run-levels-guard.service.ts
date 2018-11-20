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
              private router: Router,
              private trainingDefinitionGetter: TrainingDefinitionGetterService,
              private trainingRunGetter: TrainingRunGetterService,
              private trainingInstanceGetter: TrainingInstanceGetterService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const id = +route.paramMap.get('id');
    const order = +route.paramMap.get('order');

    return this.trainingRunGetter.getTrainingRunById(id)
      .pipe(concatMap(trainingRun => {
            const currentLevelId = trainingRun.currentLevel instanceof AbstractLevel ? trainingRun.currentLevel.id : trainingRun.currentLevel as number;
            return this.trainingDefinitionGetter.getLevelById(currentLevelId)
              .pipe(map((currentLevel) => {
                // Checks if level with currentLevel id exists, if it matches the order, and if it is associated with the same training definition
/*                if (currentLevel
                  && currentLevel.order === order
                  && currentLevel.trainingDefinitionId === trainingInstance.trainingDefinitionId)  {*/
                if (true) {
                  // TODO: insert commented out code. Not working without changing current level of a training run in a db
                  this.distractionFreeModeService.setDistractionFreeMode(true);
                  return true
                } else {
                  //this.router.navigate(['not-authorized']);
                  return false;
                }
              }));
      }));
  }

  canDeactivate(component: TrainingRunLevelComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.distractionFreeModeService.setDistractionFreeMode(false);
    return true;
  }
}
