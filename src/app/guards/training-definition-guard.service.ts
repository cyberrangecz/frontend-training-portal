import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";
import {ActiveUserService} from "../services/active-user.service";
import {TrainingDefinitionGetterService} from "../services/data-getters/training-definition-getter.service";
import {map} from "rxjs/operators";
import {TrainingDefinitionStateEnum} from "../enums/training-definition-state.enum";
import {AlertService} from "../services/event-services/alert.service";

@Injectable()
export class TrainingDefinitionGuard implements CanActivate {

  constructor(
    private router: Router,
    private alertService: AlertService,
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
      this.router.navigate(['not-authorized']);
      return false;
    }

    return this.trainingDefinitionGetter.getTrainingDefById(id)
      .pipe(map((trainingDef => {
        // Training definition with such id either does not exist, cannot be edited or user is not authorized to edit it
        if (!trainingDef
          || trainingDef.state !== TrainingDefinitionStateEnum.Unreleased
          || !trainingDef.authorIds.includes(this.activeUserService.getActiveUser().id)) {
          this.router.navigate(['not-authorized']);
          return false;
        }
        return true;
      })));
  }


}
