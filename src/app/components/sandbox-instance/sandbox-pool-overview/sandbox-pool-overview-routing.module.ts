import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SandboxPoolOverviewComponent} from "./sandbox-pool-overview.component";

const routes: Routes = [
  {
    path: '',
    component: SandboxPoolOverviewComponent
  },
  {
    path: ':id',
    loadChildren: () => import('app/components/sandbox-instance/sandbox-instance-overview/sandbox-instance-overview.module').then(m => m.SandboxInstanceOverviewModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SandboxPoolOverviewRoutingModule { }
