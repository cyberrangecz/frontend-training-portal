import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SandboxInstanceResourceResolver} from '../../../services/resolvers/sandbox-instance-resolvers/sandbox-instance-resource-resolver.service';
import {SandboxInstanceResourceDetailComponent} from './sandbox-instance-resource-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SandboxInstanceResourceDetailComponent,
    resolve: {
      sandboxResource: SandboxInstanceResourceResolver
    }
  }
];

/**
 * Routing module for sandbox instance resource detail module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SandboxInstanceResourceDetailRoutingModule {

}
