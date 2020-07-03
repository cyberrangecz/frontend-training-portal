import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  POOL_ALLOCATION_REQUEST_PATH,
  POOL_CLEANUP_REQUEST_PATH,
  POOL_DATA_ATTRIBUTE_NAME,
  POOL_REQUEST_ID_SELECTOR,
  PoolRequestBreadcrumbResolver,
  PoolResolver,
  SANDBOX_INSTANCE_ID_SELECTOR,
  SANDBOX_INSTANCE_PATH,
  SANDBOX_INSTANCE_TOPOLOGY_PATH,
  SandboxInstanceBreadcrumbResolver,
  PoolDetailComponent,
} from 'kypo-sandbox-agenda';
const routes: Routes = [
  {
    path: '',
    component: PoolDetailComponent,
    resolve: {
      [POOL_DATA_ATTRIBUTE_NAME]: PoolResolver,
    },
  },
  {
    path: `${SANDBOX_INSTANCE_PATH}/:${SANDBOX_INSTANCE_ID_SELECTOR}/${SANDBOX_INSTANCE_TOPOLOGY_PATH}`,
    loadChildren: () =>
      import('./sandbox-instance/sandbox-instance-topology.module').then((m) => m.SandboxInstanceTopologyModule),
    resolve: {
      breadcrumb: SandboxInstanceBreadcrumbResolver,
    },
    data: {
      title: 'Sandbox Topology',
    },
  },
  {
    path: `${POOL_ALLOCATION_REQUEST_PATH}/:${POOL_REQUEST_ID_SELECTOR}`,
    loadChildren: () =>
      import('./request/pool-allocation-request-detail.module').then((m) => m.PoolAllocationRequestDetailModule),
    resolve: {
      breadcrumb: PoolRequestBreadcrumbResolver,
    },
    data: {
      title: 'Allocation Request Stages',
    },
  },
  {
    path: `${POOL_CLEANUP_REQUEST_PATH}/:${POOL_REQUEST_ID_SELECTOR}`,
    loadChildren: () =>
      import('./request/pool-cleanup-request-detail.module').then((m) => m.PoolCleanupRequestDetailModule),
    resolve: {
      breadcrumb: PoolRequestBreadcrumbResolver,
    },
    data: {
      title: 'Cleanup Request Stages',
    },
  },
];

/**
 * Routing for pool detail module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SandboxPoolDetailRoutingModule {}
