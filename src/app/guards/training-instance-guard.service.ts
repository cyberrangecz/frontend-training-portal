import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";
import {map} from "rxjs/operators";
import {TrainingInstanceGetterService} from "../services/data-getters/training-instance-getter.service";
import {ActiveUserService} from "../services/active-user.service";

/**
 * Guard which determines if the user can access training instance with id provided in url parameter
 */
@Injectable()
export class TrainingInstanceGuard implements CanActivate {

  constructor(
    private router: Router,
    private trainingInstanceGetter: TrainingInstanceGetterService,
    private activeUserService: ActiveUserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const id = +route.paramMap.get('id');
    const now = Date.now();
    return this.trainingInstanceGetter.getTrainingInstanceById(id)
      .pipe(map((trainingInstance => {
        // Training instance with such id either does not exist or user is not authorized to display it
        if (!trainingInstance
          || (trainingInstance.startTime.valueOf() > now || trainingInstance.endTime.valueOf() < now)
          || !trainingInstance.organizersIds.includes(this.activeUserService.getActiveUser().id)) {
          this.router.navigate(['not-authorized']);
          return false;
        }
        return true;
      })));
  }

}
