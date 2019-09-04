import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {TrainingDefinitionFacade} from '../facades/training-definition-facade.service';
import {TRAINING_DEFINITION_NEW_PATH} from '../../components/training-definition/training-definition-overview/paths';
import {mergeMap, take} from 'rxjs/operators';


@Injectable()
export class TrainingDefinitionBreadcrumbResolver implements Resolve<string> {

  constructor(private trainingDefinitionFacade: TrainingDefinitionFacade) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    if (state.url.endsWith(TRAINING_DEFINITION_NEW_PATH)) {
      return 'Add';
    } else if (route.paramMap.has('id')) {
      const id = Number(route.paramMap.get('id'));
      return this.trainingDefinitionFacade.getById(id)
        .pipe(
          take(1),
          mergeMap(td => td ? of(td.title) : EMPTY)
        );
    }
    return EMPTY;
  }
}
