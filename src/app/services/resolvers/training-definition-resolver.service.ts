import {Injectable} from '@angular/core';
import {TrainingDefinition} from '../../model/training/training-definition';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {TRAINING_DEFINITION_NEW_PATH} from '../../components/training-definition/training-definition-overview/paths';
import {TrainingDefinitionFacade} from '../facades/training-definition-facade.service';
import {TRAINING_DEFINITION_PATH} from '../../paths';
import {mergeMap, take, tap} from 'rxjs/operators';

@Injectable()
export class TrainingDefinitionResolver implements Resolve<TrainingDefinition> {

  constructor(private trainingDefinitionFacade: TrainingDefinitionFacade,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TrainingDefinition> | Promise<TrainingDefinition> | TrainingDefinition {
/*    if (state.url.endsWith(TRAINING_DEFINITION_NEW_PATH)) {
      return null;
    } else*/ if (route.paramMap.has('id')) {
      const id = Number(route.paramMap.get('id'));
      return this.trainingDefinitionFacade.getById(id, true)
        .pipe(
          take(1),
          mergeMap(td => td ? of(td) : this.navigateToNew()),
        );
    }
    return this.navigateToNew();
  }

  private navigateToNew(): Observable<never> {
    this.router.navigate([TRAINING_DEFINITION_PATH]);
    return EMPTY;
  }
}
