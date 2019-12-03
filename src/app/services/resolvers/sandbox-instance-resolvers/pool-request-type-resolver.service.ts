import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable} from 'rxjs';
import {
  POOL_CLEANUP_REQUEST_PATH,
  POOL_CREATION_REQUEST_PATH
} from '../../../components/sandbox-instance/sandbox-pool-detail/paths';

@Injectable()
export class PoolRequestTypeResolver implements Resolve<'CREATION' | 'CLEANUP'> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<'CREATION' | 'CLEANUP'> | Promise<'CREATION' | 'CLEANUP'> | 'CREATION' | 'CLEANUP' {
    if (state.url.includes(POOL_CREATION_REQUEST_PATH)) {
      return 'CREATION';
    }
    if (state.url.includes(POOL_CLEANUP_REQUEST_PATH)) {
      return 'CLEANUP';
    }
    return EMPTY;
  }
}
