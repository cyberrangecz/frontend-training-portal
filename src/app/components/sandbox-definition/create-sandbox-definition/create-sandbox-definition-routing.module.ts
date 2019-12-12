import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CreateSandboxDefinitionComponent} from './create-sandbox-definition.component';

const routes: Routes = [
  {
    path: '',
    component: CreateSandboxDefinitionComponent,
    data: {breadcrumb: null}
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CreateSandboxDefinitionRoutingModule {
}
