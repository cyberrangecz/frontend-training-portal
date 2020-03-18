import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SandboxPoolEditComponent} from './sandbox-pool-edit.component';

const routes: Routes = [
  {
    path: '',
    component: SandboxPoolEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SandboxPoolEditRoutingModule {

}
