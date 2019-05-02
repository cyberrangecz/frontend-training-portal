import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {TrainingDefinitionFacade} from "../services/facades/training-definition-facade.service";
import {catchError} from "rxjs/operators";

@Injectable()
export class TrainingDefinitionAccessGuardService implements CanActivate {

  constructor(private trainingDefinitionFacade: TrainingDefinitionFacade) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (state.url.endsWith('new')) {
      return true;
    } else if (route.paramMap.has('id')) {
      const id = Number(route.paramMap.get('id'));
      return this.trainingDefinitionFacade.getTrainingDefinitionExists(id)
    }
    return false;
  }

}
