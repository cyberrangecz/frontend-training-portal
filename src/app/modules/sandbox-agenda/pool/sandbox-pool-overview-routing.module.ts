import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PoolBreadcrumbResolver, SANDBOX_POOL_ID_SELECTOR, SANDBOX_POOL_NEW_PATH, SandboxPoolOverviewComponent} from 'kypo-sandbox-agenda';

const routes: Routes = [
  {
    path: '',
    component: SandboxPoolOverviewComponent,
  },
  {
    path: SANDBOX_POOL_NEW_PATH,
    loadChildren: () => import('./edit/sandbox-pool-edit.module').then(m => m.SandboxPoolEditModule),
    resolve: {
      breadcrumb: PoolBreadcrumbResolver,
    },
    data: {
      title: 'Create Pool'
    }
  },
  {
    path: `:${SANDBOX_POOL_ID_SELECTOR}`,
    loadChildren: () => import('./detail/sandbox-pool-detail.module').then(m => m.SandboxPoolDetailModule),
    resolve: {
      breadcrumb: PoolBreadcrumbResolver,
    },
    data: {
      title: 'Pool Detail'
    }
  }
];

/**
 * Routing module for sandbox pool overview
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SandboxPoolOverviewRoutingModule { }
