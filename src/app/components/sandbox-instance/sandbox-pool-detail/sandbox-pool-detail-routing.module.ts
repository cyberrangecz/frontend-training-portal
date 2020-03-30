import {InjectionToken, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PoolRequestBreadcrumbResolver} from '../../../services/resolvers/sandbox-instance-resolvers/pool-request-breadcrumb-resolver.service';
import {PoolResolver} from '../../../services/resolvers/sandbox-instance-resolvers/pool-resolver.service';
import {SandboxInstanceBreadcrumbResolver} from '../../../services/resolvers/sandbox-instance-resolvers/sandbox-instance-breadcrumb-resolver.service';
import {
  POOL_CLEANUP_REQUEST_PATH,
  POOL_ALLOCATION_REQUEST_PATH,
  POOL_REQUEST_ID_SELECTOR, SANDBOX_ALLOCATION_UNIT_ID_SELECTOR, SANDBOX_ALLOCATION_UNIT_PATH,
  SANDBOX_INSTANCE_ID_SELECTOR,
  SANDBOX_INSTANCE_PATH,
  SANDBOX_INSTANCE_TOPOLOGY_PATH
} from './paths';
import {SandboxPoolDetailComponent} from './sandbox-pool-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SandboxPoolDetailComponent,
    resolve: {
      pool: PoolResolver
    }
  },
  {
    path: `${SANDBOX_INSTANCE_PATH}/:${SANDBOX_INSTANCE_ID_SELECTOR}/${SANDBOX_INSTANCE_TOPOLOGY_PATH}`,
    loadChildren: () => import('app/components/sandbox-instance/sandbox-instance-topology/sandbox-instance-topology.module').then(m => m.SandboxInstanceTopologyModule),
    resolve: {
      breadcrumb: SandboxInstanceBreadcrumbResolver
    }
  },
  {
    path: `${SANDBOX_ALLOCATION_UNIT_PATH}/:${SANDBOX_ALLOCATION_UNIT_ID_SELECTOR}/${POOL_ALLOCATION_REQUEST_PATH}/:${POOL_REQUEST_ID_SELECTOR}`,
    loadChildren: () => import('app/components/sandbox-instance/pool-request-detail/pool-allocation-request-detail.module').then(m => m.PoolAllocationRequestDetailModule),
    resolve: {
      breadcrumb: PoolRequestBreadcrumbResolver,
    }
  },
  {
    path: `${SANDBOX_ALLOCATION_UNIT_PATH}/:${SANDBOX_ALLOCATION_UNIT_ID_SELECTOR}/${POOL_CLEANUP_REQUEST_PATH}/:${POOL_REQUEST_ID_SELECTOR}`,
    loadChildren: () => import('app/components/sandbox-instance/pool-request-detail/pool-cleanup-request-detail.module').then(m => m.PoolCleanupRequestDetailModule),
    resolve: {
      breadcrumb: PoolRequestBreadcrumbResolver,
    }
  }
];

/**
 * Routing for pool detail module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SandboxPoolDetailRoutingModule {

}
