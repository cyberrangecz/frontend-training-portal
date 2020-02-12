import {SandboxInstanceResource} from '../../../model/sandbox/pool/sandbox-instance/sandbox-instance-resource/sandbox-instance-resource';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {EMPTY, Observable, of} from 'rxjs';
import {SandboxInstanceApi} from '../../api/sandbox-instance-api.service';
import {POOL_ID_SELECTOR} from '../../../components/sandbox-instance/sandbox-pool-overview/paths';
import {SANDBOX_INSTANCE_ID_SELECTOR} from '../../../components/sandbox-instance/sandbox-pool-detail/paths';
import {catchError, mergeMap, take} from 'rxjs/operators';
import {RouteFactory} from '../../../model/routes/route-factory';
import {SANDBOX_INSTANCE_RESOURCE_ID_SELECTOR} from '../../../components/sandbox-instance/sandbox-instance-resource-detail/paths';
import {ErrorHandlerService} from '../../shared/error-handler.service';

/**
 * Router data provider
 */
@Injectable()
export class SandboxInstanceResourceResolver implements Resolve<SandboxInstanceResource> {

  constructor(private sandboxInstanceFacade: SandboxInstanceApi,
              private errorHandler: ErrorHandlerService,
              private router: Router) {
  }

  /**
   * Retrieves a specific resource based on id provided in url. Navigates to a resource overview if no resource with such id exists.
   * @param route route snapshot
   * @param state router state snapshot
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<SandboxInstanceResource> | Promise<SandboxInstanceResource> | SandboxInstanceResource {
    if (!route.paramMap.has(POOL_ID_SELECTOR)) {
      return this.navigateToPoolOverview();
    }
    const poolId = Number(route.paramMap.get(POOL_ID_SELECTOR));
    if (!route.paramMap.has(SANDBOX_INSTANCE_ID_SELECTOR)) {
      return this.navigateToPool(poolId);
    }
    const sandboxId = Number(route.paramMap.get(SANDBOX_INSTANCE_ID_SELECTOR));

    if (!route.paramMap.has(SANDBOX_INSTANCE_RESOURCE_ID_SELECTOR)) {
      return this.navigateToSandboxDetail(poolId, sandboxId);
    }

    const resourceId = route.paramMap.get(SANDBOX_INSTANCE_RESOURCE_ID_SELECTOR);
    return this.sandboxInstanceFacade.getResource(sandboxId, resourceId)
      .pipe(
        take(1),
        mergeMap(resource => resource ? of(resource) : this.navigateToSandboxDetail(poolId, sandboxId)),
        catchError(err => {
          this.errorHandler.display(err, 'Sandbox instance resource resolver');
          this.navigateToPool(poolId);
          return EMPTY;
        })
      );
  }

  private navigateToSandboxDetail(poolId: number, sandboxId: number): Observable<never> {
    this.router.navigate([RouteFactory.toSandboxInstance(poolId, sandboxId)]);
    return EMPTY;
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
