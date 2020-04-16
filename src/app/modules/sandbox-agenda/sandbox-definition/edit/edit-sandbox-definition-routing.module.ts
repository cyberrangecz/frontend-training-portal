import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditSandboxDefinitionComponent } from 'kypo-sandbox-agenda';

const routes: Routes = [
  {
    path: '',
    component: EditSandboxDefinitionComponent,
  },
];

/**
 * Create sandbox definition routing module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSandboxDefinitionRoutingModule {}
