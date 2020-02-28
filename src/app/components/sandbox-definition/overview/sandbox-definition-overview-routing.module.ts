import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SandboxDefinitionOverviewComponent} from './sandbox-definition-overview.component';
import {SANDBOX_DEFINITION_NEW_PATH} from './paths';

const routes: Routes = [
  {
    path: '',
    component: SandboxDefinitionOverviewComponent,
  },
  {
    path: SANDBOX_DEFINITION_NEW_PATH,
    loadChildren: () => import('app/components/sandbox-definition/detail/create-sandbox-definition.module').then(m => m.CreateSandboxDefinitionModule),
    data: {breadcrumb: 'Create'}
  },

];

/**
 * Sandbox definition overview routing
 */
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class SandboxDefinitionOverviewRoutingModule {

}
