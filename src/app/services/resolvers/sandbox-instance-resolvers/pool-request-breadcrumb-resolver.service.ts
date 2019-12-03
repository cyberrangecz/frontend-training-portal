import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PoolRequest} from '../../../model/sandbox/pool/request/pool-request';
import {SandboxInstanceFacade} from '../../facades/sandbox-instance-facade.service';
import {PoolRequestResolver} from './pool-request-resolver.service';
import {POOL_CREATION_REQUEST_PATH} from '../../../components/sandbox-instance/sandbox-pool-detail/paths';

@Injectable()
export class PoolRequestBreadcrumbResolver implements Resolve<string> {

  constructor(private sandboxInstanceFacade: SandboxInstanceFacade,
              private poolRequestResolver: PoolRequestResolver) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    const resolved = this.poolRequestResolver.resolve(route, state) as Observable<PoolRequest>;
    const requestTypeName = state.url.includes(POOL_CREATION_REQUEST_PATH)
      ? 'Creation Request'
      : 'Cleanup Request';
    return resolved.pipe(map(poolRequest => `${requestTypeName} ${poolRequest.id}`));
  }
}
