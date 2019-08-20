import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SandboxInstanceOverviewComponent} from './sandbox-instance-overview.component';

const routes: Routes = [
  {
    path: 'sandbox-instance',
    component: SandboxInstanceOverviewComponent,
  },
  {
    path: 'sandbox-instance/:id',
    loadChildren: () => import('app/components/sandbox-instance/sandbox-instance-detail/sandbox-instance-detail.module').then(m => m.SandboxInstanceDetailModule),
  },
  {
    path: '',
    redirectTo: 'sandbox-instance',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SandboxInstanceOverviewRoutingModule {

}
