import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {PoolRequest} from '../../model/sandbox/pool/request/pool-request';
import {EMPTY, Observable, of} from 'rxjs';
import {SandboxInstanceFacade} from '../facades/sandbox-instance-facade.service';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {POOL_ID_SELECTOR} from '../../components/sandbox-instance/sandbox-pool-overview/paths';
import {catchError, mergeMap, take} from 'rxjs/operators';
import {RouteFactory} from '../../model/routes/route-factory';
import {POOL_REQUEST_ID_SELECTOR} from '../../components/sandbox-instance/sandbox-pool-detail/paths';

@Injectable()
export class PoolRequestResolver implements Resolve<PoolRequest> {

  constructor(private sandboxInstanceFacade: SandboxInstanceFacade,
              private errorHandler: ErrorHandlerService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PoolRequest> | Promise<PoolRequest> | PoolRequest {
    if (!route.paramMap.has(POOL_ID_SELECTOR)) {
      return this.navigateToPoolOverview();
    }
    const poolId = Number(route.paramMap.get(POOL_ID_SELECTOR));
    if (!route.paramMap.has(POOL_REQUEST_ID_SELECTOR)) {
      return this.navigateToPool(poolId);
    }

    const requestId = Number(route.paramMap.get(POOL_REQUEST_ID_SELECTOR));
    return this.sandboxInstanceFacade.getRequest(poolId, requestId)
      .pipe(
        take(1),
        mergeMap(request => request ? of(request) : this.navigateToPool(poolId)),
        catchError(err => {
          this.errorHandler.display(err, 'Pool request resolver');
          this.navigateToPool(poolId);
          return EMPTY;
        })
      );
  }

  private navigateToPool(poolId: number): Observable<never> {
    this.router.navigate([RouteFactory.toPool(poolId)]);
    return EMPTY;
  }

  private navigateToPoolOverview(): Observable<never> {
    this.router.navigate([RouteFactory.toPoolOverview()]);
    return EMPTY;
  }
}
