import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {TrainingInstanceFacade} from "../services/facades/training-instance-facade.service";
import {Observable} from "rxjs";

@Injectable()
export class TrainingInstanceGuardService implements CanActivate {

  constructor(private trainingInstanceFacade: TrainingInstanceFacade) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (route.paramMap.has('id')) {
      const id = Number(route.paramMap.get('id'));
      return this.trainingInstanceFacade.getTrainingInstanceExists(id)
    }
    return false;
  }
}
