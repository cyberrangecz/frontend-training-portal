import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, ParamMap, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";
import {ActiveUserService} from "../services/active-user.service";
import {TrainingDefinitionGetterService} from "../services/data-getters/training-definition-getter.service";
import {map} from "rxjs/operators";

@Injectable()
export class TrainingDefinitionGuard implements CanActivate {

  constructor(
    private router: Router,
    private activeUserService: ActiveUserService,
    private trainingDefinitionGetter: TrainingDefinitionGetterService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const paramString = route.paramMap.get('id');
    const id = +paramString;

    // id equals null
    if (Number.isNaN(id) && paramString === 'null') {
      return true;
    }

    // iq is not a number and does not equal null
    if (Number.isNaN(id) && paramString !== 'null') {
      this.router.navigate(['designer/training', {id: null}]);
      return false;
    }

    return this.trainingDefinitionGetter.getTrainingDefById(id)
      .pipe(map((trainingDef => {
        // training definition with such id does not exist
        if (!trainingDef) {
          this.router.navigate(['designer/training', {id: null}]);
          return false;
          // training definition with such id exists but user is not authorized to access it
        } else if (!trainingDef.authorIds.includes(this.activeUserService.getActiveUser().id)) {
          this.router.navigate(['designer']);
          return false;
        }
        return true;
      })));
  }


}
