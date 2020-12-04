import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SANDBOX_DEFINITION_NEW_PATH } from '@muni-kypo-crp/sandbox-agenda';
import { SandboxDefinitionOverviewComponent } from '@muni-kypo-crp/sandbox-agenda/sandbox-definition-overview';

const routes: Routes = [
  {
    path: '',
    component: SandboxDefinitionOverviewComponent,
  },
  {
    path: SANDBOX_DEFINITION_NEW_PATH,
    loadChildren: () => import('./edit/sandbox-definition-edit.module').then((m) => m.SandboxDefinitionEditModule),
    data: {
      breadcrumb: 'Create',
      title: 'Create Sandbox Definition',
    },
  },
];

/**
 * Sandbox definition overview routing
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SandboxDefinitionOverviewRoutingModule {}
