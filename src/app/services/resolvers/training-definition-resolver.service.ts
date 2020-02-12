import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, mergeMap, take} from 'rxjs/operators';
import {TRAINING_DEFINITION_NEW_PATH} from '../../components/training-definition/training-definition-overview/paths';
import {TrainingDefinition} from '../../model/training/training-definition';
import {TRAINING_DEFINITION_PATH} from '../../paths';
import {TrainingDefinitionApi} from '../api/training-definition-api.service';
import {ErrorHandlerService} from '../shared/error-handler.service';

/**
 * Router data provider
 */
@Injectable()
export class TrainingDefinitionResolver implements Resolve<TrainingDefinition> {

  constructor(private trainingDefinitionFacade: TrainingDefinitionApi,
              private errorHandler: ErrorHandlerService,
              private router: Router) {
  }

  /**
   * Retrieves a specific resource based on id provided in url. Navigates to a resource overview if no resource with such id exists.
   * @param route route snapshot
   * @param state router state snapshot
   */
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<TrainingDefinition> | Promise<TrainingDefinition> | TrainingDefinition {
    if (state.url.endsWith(`${TRAINING_DEFINITION_PATH}/${TRAINING_DEFINITION_NEW_PATH}`)) {
      return null;
    } else if (route.paramMap.has('id')) {
      const id = Number(route.paramMap.get('id'));
      return this.trainingDefinitionFacade.get(id, true)
        .pipe(
          take(1),
          mergeMap(td => td ? of(td) : this.navigateToNew()),
          catchError(err => {
            this.errorHandler.display(err, 'Training definition resolver');
            this.navigateToNew();
            return EMPTY;
          })
        );
    }
    return this.navigateToNew();
  }

  private navigateToNew(): Observable<never> {
    this.router.navigate([TRAINING_DEFINITION_NEW_PATH]);
    return EMPTY;
  }
}
