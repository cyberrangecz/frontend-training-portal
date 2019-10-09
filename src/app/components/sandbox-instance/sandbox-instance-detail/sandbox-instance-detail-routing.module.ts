import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SandboxInstanceResolver} from '../../../services/resolvers/sandbox-instance-resolver.service';
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SandboxInstanceDetailRoutingModule { }
