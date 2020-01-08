import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SandboxInstanceResolver} from '../../../services/resolvers/sandbox-instance-resolvers/sandbox-instance-resolver.service';
import {SandboxInstanceResourceBreadcrumbResolver} from '../../../services/resolvers/sandbox-instance-resolvers/sandbox-instance-resource-breadcrumb-resolver.service';
import {
  SANDBOX_INSTANCE_RESOURCE_ID_SELECTOR,
  SANDBOX_INSTANCE_RESOURCE_PATH
} from '../sandbox-instance-resource-detail/paths';
import {SandboxInstanceDetailComponent} from './sandbox-instance-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SandboxInstanceDetailComponent,
    data: {
      breadcrumb: null
    },
    resolve: {
      sandboxInstance: SandboxInstanceResolver
    }
  },
  {
    path: `${SANDBOX_INSTANCE_RESOURCE_PATH}/:${SANDBOX_INSTANCE_RESOURCE_ID_SELECTOR}`,
    loadChildren: () => import('app/components/sandbox-instance/sandbox-instance-resource-detail/sandbox-instance-resource-detail.module').then(m => m.SandboxInstanceResourceDetailModule),
    resolve: {
      breadcrumb: SandboxInstanceResourceBreadcrumbResolver
    }
  },
];

/**
 * Routing for sandbox instance detail page
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SandboxInstanceDetailRoutingModule { }
