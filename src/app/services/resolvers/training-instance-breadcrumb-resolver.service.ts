import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {
  TRAINING_INSTANCE_EDIT_PATH,
  TRAINING_INSTANCE_NEW_PATH
} from '../../components/training-instance/training-instance-overview/paths';
import {TrainingInstance} from 'kypo-training-model';
import {TrainingInstanceResolver} from './training-instance-resolver.service';

/**
 * Router breadcrumb title provider
 */
@Injectable()
export class TrainingInstanceBreadcrumbResolver implements Resolve<string> {

  constructor(private trainingInstanceResolver: TrainingInstanceResolver) {
  }

  /**
   * Retrieves a breadcrumb title based on provided url
   * @param route route snapshot
   * @param state router state snapshot
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    if (state.url.endsWith(TRAINING_INSTANCE_NEW_PATH)) {
      return 'Create';
    } else if (route.paramMap.has('id')) {
      const resolved = this.trainingInstanceResolver.resolve(route, state) as Observable<TrainingInstance>;
      return resolved.pipe(
          map(ti => ti ? this.getBreadcrumbFromInstance(ti, state) : ''),
        );
    }
    return EMPTY;
  }


  private getBreadcrumbFromInstance(trainingInstance: TrainingInstance, state: RouterStateSnapshot): string {
    return state.url.includes(TRAINING_INSTANCE_EDIT_PATH)
      ? `Edit ${trainingInstance.title}`
      : trainingInstance.title;
  }
}
