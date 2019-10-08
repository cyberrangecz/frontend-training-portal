import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SandboxPoolOverviewComponent} from './sandbox-pool-overview.component';
import {POOL_ID_SELECTOR} from './paths';
import {PoolBreadcrumbResolver} from '../../../services/resolvers/pool-breadcrumb-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: SandboxPoolOverviewComponent,
    data: {
      breadcrumb: null
    }
  },
  {
    path: `:${POOL_ID_SELECTOR}`,
    loadChildren: () => import('app/components/sandbox-instance/sandbox-pool-detail/sandbox-pool-detail.module').then(m => m.SandboxInstanceOverviewModule),
    resolve: {
      breadcrumb: PoolBreadcrumbResolver,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SandboxPoolOverviewRoutingModule { }
