import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SANDBOX_INSTANCE_DATA_ATTRIBUTE_NAME } from 'kypo-sandbox-agenda';
import { SandboxInstanceResolver } from 'kypo-sandbox-agenda/resolvers';
import { SandboxInstanceTopologyComponent } from 'kypo-sandbox-agenda/topology';

const routes: Routes = [
  {
    path: '',
    component: SandboxInstanceTopologyComponent,
    resolve: {
      [SANDBOX_INSTANCE_DATA_ATTRIBUTE_NAME]: SandboxInstanceResolver,
    },
  },
];

/**
 * Routing module for sandbox instance topology module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SandboxInstanceTopologyRoutingModule {}
