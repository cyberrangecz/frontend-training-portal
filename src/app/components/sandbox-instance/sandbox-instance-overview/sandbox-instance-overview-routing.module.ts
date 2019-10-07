import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SandboxInstanceOverviewComponent} from './sandbox-instance-overview.component';
import {SANDBOX_INSTANCE_PATH} from './paths';

const routes: Routes = [
  {
    path: SANDBOX_INSTANCE_PATH,
    component: SandboxInstanceOverviewComponent,
    data: {breadcrumb: null}
  },
  {
    path: `${SANDBOX_INSTANCE_PATH}/:sandboxId`,
    loadChildren: () => import('app/components/sandbox-instance/sandbox-instance-detail/sandbox-instance-detail.module').then(m => m.SandboxInstanceDetailModule),
  },
  {
    path: '',
    redirectTo: SANDBOX_INSTANCE_PATH,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SandboxInstanceOverviewRoutingModule {

}
