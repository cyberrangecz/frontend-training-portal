import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SandboxInstanceDetailComponent} from './sandbox-instance-detail.component';
import {SandboxInstanceResolver} from '../../../services/resolvers/sandbox-instance-resolver.service';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SandboxInstanceDetailRoutingModule { }
