import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SandboxInstanceResolver} from '../../../services/resolvers/sandbox-instance-resolvers/sandbox-instance-resolver.service';
import {SandboxInstanceTopologyComponent} from './sandbox-instance-topology.component';
const routes: Routes = [
  {
    path: '',
    component: SandboxInstanceTopologyComponent,
    resolve: {
      sandboxInstance: SandboxInstanceResolver
    }
  },
];

/**
 * Routing module for sandbox instance topology module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SandboxInstanceTopologyRoutingModule { }
