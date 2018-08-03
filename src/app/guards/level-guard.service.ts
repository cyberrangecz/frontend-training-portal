import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from "@angular/router";
import {TrainingDefinitionComponent} from "../components/designer/training-definition/training-definition.component";
import {Observable} from "rxjs/internal/Observable";

@Injectable()
export class LevelGuardService implements CanDeactivate<TrainingDefinitionComponent> {

  canDeactivate(component: TrainingDefinitionComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

}
