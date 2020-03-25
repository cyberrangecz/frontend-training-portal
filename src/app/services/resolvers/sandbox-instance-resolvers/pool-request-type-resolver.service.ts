import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable} from 'rxjs';
import {
  POOL_CLEANUP_REQUEST_PATH,
  POOL_ALLOCATION_REQUEST_PATH
} from '../../../components/sandbox-instance/sandbox-pool-detail/paths';

/**
 * Router breadcrumb title provider
 */
@Injectable()
export class PoolRequestTypeResolver implements Resolve<'ALLOCATION' | 'CLEANUP'> {

  /**
   * Retrieves a breadcrumb title based on provided url
   * @param route route snapshot
   * @param state router state snapshot
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<'ALLOCATION' | 'CLEANUP'> | Promise<'ALLOCATION' | 'CLEANUP'> | 'ALLOCATION' | 'CLEANUP' {
    if (state.url.includes(POOL_ALLOCATION_REQUEST_PATH)) {
      return 'ALLOCATION';
    }
    if (state.url.includes(POOL_CLEANUP_REQUEST_PATH)) {
      return 'CLEANUP';
    }
    return EMPTY;
  }
}
