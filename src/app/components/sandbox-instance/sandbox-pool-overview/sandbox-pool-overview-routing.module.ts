import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PoolBreadcrumbResolver} from '../../../services/resolvers/pool-breadcrumb-resolver.service';
import {POOL_ID_SELECTOR} from './paths';
import {SandboxPoolOverviewComponent} from './sandbox-pool-overview.component';

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
