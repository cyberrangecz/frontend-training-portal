import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";

import {Injectable} from "@angular/core";
import {ActiveTrainingRunLevelsService} from "../services/active-training-run-levels.service";
@Injectable()
/**
 * Guard which determines whether the user can access the training run (if it still active and associated with him)
 */
export class TrainingRunGuard implements CanActivate {

  constructor(
    private router: Router,
    private activeLevelsService: ActiveTrainingRunLevelsService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.activeLevelsService.getActiveLevels()
      && this.activeLevelsService.getActiveLevels().length > 0
      && this.activeLevelsService.getActiveLevel()) {
      return true;
    }
    else {
      this.router.navigate(['not-authorized']);
      return false;
    }
  }
}
