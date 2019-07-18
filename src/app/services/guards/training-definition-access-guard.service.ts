import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {TrainingDefinitionFacade} from "../facades/training-definition-facade.service";

@Injectable()
export class TrainingDefinitionAccessGuardService implements CanActivate {

  constructor(private trainingDefinitionFacade: TrainingDefinitionFacade) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (state.url.endsWith('new')) {
      return true;
    } else if (route.paramMap.has('id')) {
      const id = Number(route.paramMap.get('id'));
      return this.trainingDefinitionFacade.exists(id)
    }
    return false;
  }
}
