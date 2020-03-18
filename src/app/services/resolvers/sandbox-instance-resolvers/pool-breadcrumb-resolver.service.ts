import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SandboxPool} from '../../../model/sandbox/pool/sandbox-pool';
import {PoolResolver} from './pool-resolver.service';
import {SANDBOX_POOL_NEW_PATH} from '../../../components/sandbox-instance/sandbox-pool-overview/paths';

/**
 * Router breadcrumb title provider
 */
@Injectable()
export class PoolBreadcrumbResolver implements Resolve<string> {

  constructor(private poolResolver: PoolResolver) {
  }

  /**
   * Retrieves a breadcrumb title based on provided url
   * @param route route snapshot
   * @param state router state snapshot
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    if (state.url.endsWith(SANDBOX_POOL_NEW_PATH)) {
      return 'Create';
    }
    const resolved = this.poolResolver.resolve(route, state) as Observable<SandboxPool>;
    return resolved.pipe(map(pool => `Pool ${pool.id}`));
  }
}
