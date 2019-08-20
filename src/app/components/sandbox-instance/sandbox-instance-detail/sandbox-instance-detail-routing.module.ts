import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SandboxInstanceDetailComponent} from './sandbox-instance-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SandboxInstanceDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SandboxInstanceDetailRoutingModule { }
