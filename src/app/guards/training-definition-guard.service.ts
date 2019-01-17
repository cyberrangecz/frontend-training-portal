import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";
import {ActiveUserService} from "../services/active-user.service";
import {TrainingDefinitionFacade} from "../services/facades/training-definition-facade.service";
import {map} from "rxjs/operators";
import {TrainingDefinitionStateEnum} from "../enums/training-definition-state.enum";
import {AlertService} from "../services/event-services/alert.service";
import {TrainingDefinitionComponent} from "../components/designer/training-definition/training-definition.component";

/**
 * Guard which determines if user can access training definition with id specified in url parameters
 */
@Injectable()
export class TrainingDefinitionGuard implements CanActivate, CanDeactivate<TrainingDefinitionComponent> {

  constructor(
    private router: Router,
    private alertService: AlertService,
    private activeUserService: ActiveUserService,
    private trainingDefinitionFacade: TrainingDefinitionFacade) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const id = +route.paramMap.get('id');
    return this.trainingDefinitionFacade.getTrainingDefinitionById(id)
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

  canDeactivate(component: TrainingDefinitionComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }

}
