import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SandboxDefinitionOverviewComponent} from './sandbox-definition-overview.component';

const routes: Routes = [
  {
    path: '',
    component: SandboxDefinitionOverviewComponent,
    data: {breadcrumb: null}
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class SandboxDefinitionOverviewRoutingModule {

}
