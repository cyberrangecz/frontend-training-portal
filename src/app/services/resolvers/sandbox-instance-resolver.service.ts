import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, mergeMap, take} from 'rxjs/operators';
import {
  SANDBOX_INSTANCE_ID_SELECTOR
} from '../../components/sandbox-instance/sandbox-pool-detail/paths';
import {POOL_ID_SELECTOR} from '../../components/sandbox-instance/sandbox-pool-overview/paths';
import {RouteFactory} from '../../model/routes/route-factory';
import {SandboxInstanceFacade} from '../facades/sandbox-instance-facade.service';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {SandboxInstance} from '../../model/sandbox/pool/sandbox-instance/sandbox-instance';

@Injectable()
export class SandboxInstanceResolver implements Resolve<SandboxInstance> {

  constructor(private sandboxInstanceFacade: SandboxInstanceFacade,
              private errorHandler: ErrorHandlerService,
              private router: Router) {
  }
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<SandboxInstance> | Promise<SandboxInstance> | SandboxInstance {
    if (!route.paramMap.has(POOL_ID_SELECTOR)) {
      return this.navigateToPoolOverview();
    }
    const poolId = Number(route.paramMap.get(POOL_ID_SELECTOR));
    if (!route.paramMap.has(SANDBOX_INSTANCE_ID_SELECTOR)) {
      return this.navigateToPool(poolId);
    }

    const sandboxId = Number(route.paramMap.get(SANDBOX_INSTANCE_ID_SELECTOR));
    return this.sandboxInstanceFacade.getSandbox(sandboxId)
      .pipe(
        take(1),
        mergeMap(sandbox => sandbox ? of(sandbox) : this.navigateToPool(poolId)),
        catchError(err => {
          this.errorHandler.display(err, 'Sandbox instance resolver');
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
