import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PoolRequest} from '../../../model/sandbox/pool/request/pool-request';
import {SandboxInstanceFacade} from '../../facades/sandbox-instance-facade.service';
import {PoolRequestResolver} from './pool-request-resolver.service';

@Injectable()
export class PoolRequestBreadcrumbResolver implements Resolve<string> {

  constructor(private sandboxInstanceFacade: SandboxInstanceFacade,
              private poolRequestResolver: PoolRequestResolver) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    const resolved = this.poolRequestResolver.resolve(route, state) as Observable<PoolRequest>;
    return resolved.pipe(map(poolRequest => `Request ${poolRequest.id}`));
  }
}
