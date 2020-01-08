import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {
  ACCESS_TOKEN_PATH,
  PROGRESS_PATH,
  RESULTS_PATH,
  SUMMARY_PATH
} from '../../components/training-instance/training-instance-detail/paths';

/**
 * Router breadcrumb title provider
 */
export class TrainingInstanceDetailBreadcrumbResolver implements Resolve<string> {

  /**
   * Retrieves a breadcrumb title based on provided url
   * @param route route snapshot
   * @param state router state snapshot
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    if (state.url.includes(SUMMARY_PATH)) {
      return 'Summary';
    }
    if (state.url.includes(PROGRESS_PATH)) {
      return 'Progress';
    }
    if (state.url.includes(RESULTS_PATH)) {
      return 'Results';
    }
    if (state.url.includes(ACCESS_TOKEN_PATH)) {
      return 'Access Token';
    }
    return '';
  }

}
