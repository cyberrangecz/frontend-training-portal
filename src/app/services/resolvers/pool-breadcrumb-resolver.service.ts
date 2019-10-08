import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {PoolResolver} from './pool-resolver.service';
import {SandboxPool} from '../../model/sandbox/pool/sandbox-pool';
import {map} from 'rxjs/operators';

@Injectable()
export class PoolBreadcrumbResolver implements Resolve<string> {

  constructor(private poolResolver: PoolResolver) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    const resolved = this.poolResolver.resolve(route, state) as Observable<SandboxPool>;
    return resolved.pipe(map(pool => `Pool ${pool.id}`));
  }
}
