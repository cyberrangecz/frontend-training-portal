import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SandboxDefinitionOverviewComponent} from './sandbox-definition-overview/sandbox-definition-overview.component';


const routes: Routes = [
  {
    path: '',
    component: SandboxDefinitionOverviewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SandboxDefinitionOverviewRoutingModule {

}
