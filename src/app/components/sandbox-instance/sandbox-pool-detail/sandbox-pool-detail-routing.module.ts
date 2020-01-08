import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PoolRequestBreadcrumbResolver} from '../../../services/resolvers/sandbox-instance-resolvers/pool-request-breadcrumb-resolver.service';
import {PoolResolver} from '../../../services/resolvers/sandbox-instance-resolvers/pool-resolver.service';
import {SandboxInstanceBreadcrumbResolver} from '../../../services/resolvers/sandbox-instance-resolvers/sandbox-instance-breadcrumb-resolver.service';
import {
  POOL_REQUEST_ID_SELECTOR,
  POOL_CREATION_REQUEST_PATH,
  SANDBOX_INSTANCE_ID_SELECTOR,
  SANDBOX_INSTANCE_PATH, SANDBOX_INSTANCE_TOPOLOGY_PATH, POOL_CLEANUP_REQUEST_PATH
} from './paths';
import {SandboxPoolDetailComponent} from './sandbox-pool-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SandboxPoolDetailComponent,
    data: {
      breadcrumb: null
    },
    resolve: {
      pool: PoolResolver
    }
  },
  {
    path: `${SANDBOX_INSTANCE_PATH}/:${SANDBOX_INSTANCE_ID_SELECTOR}`,
    loadChildren: () => import('app/components/sandbox-instance/sandbox-instance-detail/sandbox-instance-detail.module').then(m => m.SandboxInstanceDetailModule),
    resolve: {
      breadcrumb: SandboxInstanceBreadcrumbResolver
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
    path: `${POOL_CREATION_REQUEST_PATH}/:${POOL_REQUEST_ID_SELECTOR}`,
    loadChildren: () => import('app/components/sandbox-instance/pool-request-detail/pool-request-detail.module').then(m => m.PoolRequestDetailModule),
    resolve: {
      breadcrumb: PoolRequestBreadcrumbResolver,
    }
  },
  {
    path: `${POOL_CLEANUP_REQUEST_PATH}/:${POOL_REQUEST_ID_SELECTOR}`,
    loadChildren: () => import('app/components/sandbox-instance/pool-request-detail/pool-request-detail.module').then(m => m.PoolRequestDetailModule),
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
