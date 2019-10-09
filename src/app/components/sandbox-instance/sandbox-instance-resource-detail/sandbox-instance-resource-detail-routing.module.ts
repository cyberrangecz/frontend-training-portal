import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SandboxInstanceResourceResolver} from '../../../services/resolvers/sandbox-instance-resource-resolver.service';
import {SandboxInstanceResourceDetailComponent} from './sandbox-instance-resource-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SandboxInstanceResourceDetailComponent,
    data: {
      breadcrumb: null
    },
    resolve: {
      sandboxResource: SandboxInstanceResourceResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SandboxInstanceResourceDetailRoutingModule {

}
