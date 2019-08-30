import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {TrainingDefinitionFacade} from '../facades/training-definition-facade.service';
import {TRAINING_DEFINITION_NEW_PATH} from '../../components/training-definition/training-definition-overview/paths';

@Injectable()
export class TrainingDefinitionAccessGuard implements CanActivate {

  constructor(private trainingDefinitionFacade: TrainingDefinitionFacade) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (state.url.endsWith(TRAINING_DEFINITION_NEW_PATH)) {
      return true;
    } else if (route.paramMap.has('id')) {
      const id = Number(route.paramMap.get('id'));
      return this.trainingDefinitionFacade.exists(id);
    }
    return false;
  }
}
