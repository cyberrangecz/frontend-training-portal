import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SandboxDefinitionEditComponent } from '@muni-kypo-crp/sandbox-agenda/sandbox-definition-edit';

const routes: Routes = [
  {
    path: '',
    component: SandboxDefinitionEditComponent,
  },
];

/**
 * Create sandbox definition routing module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SandboxDefinitionEditRoutingModule {}
