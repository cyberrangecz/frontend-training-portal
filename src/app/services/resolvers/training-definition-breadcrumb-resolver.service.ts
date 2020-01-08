import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, mergeMap, take} from 'rxjs/operators';
import {
  TRAINING_DEFINITION_EDIT_PATH,
  TRAINING_DEFINITION_NEW_PATH
} from '../../components/training-definition/training-definition-overview/paths';
import {TrainingDefinitionApi} from '../api/training-definition-api.service';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {TrainingDefinition} from '../../model/training/training-definition';

/**
 * Router breadcrumb title provider
 */
@Injectable()
export class TrainingDefinitionBreadcrumbResolver implements Resolve<string> {

  constructor(
    private trainingDefinitionFacade: TrainingDefinitionApi,
    private errorHandler: ErrorHandlerService) {
  }

  /**
   * Retrieves a breadcrumb title based on provided url
   * @param route route snapshot
   * @param state router state snapshot
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    if (state.url.endsWith(TRAINING_DEFINITION_NEW_PATH)) {
      return 'Create';
    } else if (route.paramMap.has('id')) {
      const id = Number(route.paramMap.get('id'));
      return this.trainingDefinitionFacade.get(id)
        .pipe(
          take(1),
          mergeMap(td => td ? of(this.getBreadcrumbFromTitle(td, state)) : EMPTY),
          catchError( (err) => {
            this.errorHandler.display(err, 'Training definition breadcrumbs resolver');
            return EMPTY;
          })
        );
    }
    return EMPTY;
  }

  private getBreadcrumbFromTitle(trainingDefinition: TrainingDefinition, state: RouterStateSnapshot): string {
    return state.url.includes(TRAINING_DEFINITION_EDIT_PATH)
      ? `Edit ${trainingDefinition.title}`
      : trainingDefinition.title;
  }
}
