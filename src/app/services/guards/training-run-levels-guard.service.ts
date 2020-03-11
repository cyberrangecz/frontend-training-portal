import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {AbstractLevelComponent} from '../../components/training-run/training-run-detail/level/abstract-level.component';
import {RunningTrainingRunService} from '../training-run/running/running-training-run.service';

@Injectable()

export class TrainingRunLevelsDeactivateGuard implements CanDeactivate<AbstractLevelComponent> {

  constructor(private activeTrainingRunLevelService: RunningTrainingRunService) {
  }

  canDeactivate(component: AbstractLevelComponent, currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.activeTrainingRunLevelService.clear();
    return true;
  }
}
