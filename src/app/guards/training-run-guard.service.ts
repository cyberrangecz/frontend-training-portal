import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";
import {ActiveUserService} from "../services/active-user.service";
import {TrainingRunGetterService} from "../services/data-getters/training-run-getter.service";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";
@Injectable()
/**
 * Guard which determines whether the user can access the training run (if it still active and associated with him)
 */
export class TrainingRunGuard implements CanActivate {

  constructor(
    private router: Router,
    private trainingRunGetter: TrainingRunGetterService,
    private activeUserService: ActiveUserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const id = +route.paramMap.get('id');
    const now = Date.now();
    return this.trainingRunGetter.getTrainingRunById(id)
      .pipe(map(training => {
        if (!training
          || training.userId !== this.activeUserService.getActiveUser().id
          || training.startTime.valueOf() > now
          || training.endTime.valueOf() < now) {
          // training does not exist, or is not associated with user or has not yet started, or has already ended
          this.router.navigate(['not-authorized']);
          return false;
        }
        return true;
      }));
  }
}
