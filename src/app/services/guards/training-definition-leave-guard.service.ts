import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from "@angular/router";
import {TrainingDefinitionDetailComponent} from "../../components/training-definition/training-definition-detail/training-definition-detail.component";
import {Observable} from "rxjs";

@Injectable()
export class TrainingDefinitionLeaveGuard implements CanDeactivate<TrainingDefinitionDetailComponent> {

  canDeactivate(component: TrainingDefinitionDetailComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}
