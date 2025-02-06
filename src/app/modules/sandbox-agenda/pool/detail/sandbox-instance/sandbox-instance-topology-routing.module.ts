import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SANDBOX_INSTANCE_DATA_ATTRIBUTE_NAME } from '@cyberrangecz-platform/sandbox-agenda';
import { SandboxInstanceResolver } from '@cyberrangecz-platform/sandbox-agenda/resolvers';
import { SandboxTopologyComponent } from '@cyberrangecz-platform/sandbox-agenda/topology';

const routes: Routes = [
  {
    path: '',
    component: SandboxTopologyComponent,
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
