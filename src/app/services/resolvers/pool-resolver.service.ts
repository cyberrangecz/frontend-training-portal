import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {SandboxInstanceFacade} from '../facades/sandbox-instance-facade.service';
import {catchError, mergeMap, take} from 'rxjs/operators';
import {RouteFactory} from '../../model/routes/route-factory';
import {SandboxPool} from '../../model/sandbox/pool/sandbox-pool';
import {POOL_ID_SELECTOR} from '../../components/sandbox-instance/sandbox-pool-overview/paths';

@Injectable()
export class PoolResolver implements Resolve<SandboxPool> {

  constructor(private sandboxInstanceFacade: SandboxInstanceFacade,
              private errorHandler: ErrorHandlerService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SandboxPool> | Promise<SandboxPool> | SandboxPool {
    if (route.paramMap.has(POOL_ID_SELECTOR)) {
      const id = Number(route.paramMap.get(POOL_ID_SELECTOR));
      return this.sandboxInstanceFacade.getPool(id)
        .pipe(
          take(1),
          mergeMap(pool => pool ? of(pool) : this.navigateToOverview()),
          catchError(err => {
            this.errorHandler.display(err, 'Sandbox pool resolver');
            this.navigateToOverview();
            return EMPTY;
          })
        );
    }
    return this.navigateToOverview();
  }

  private navigateToOverview(): Observable<never> {
    this.router.navigate([RouteFactory.toPoolOverview()]);
    return EMPTY;
  }

}
