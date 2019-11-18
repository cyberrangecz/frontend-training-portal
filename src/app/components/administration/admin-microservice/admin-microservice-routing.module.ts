import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminMicroserviceWrapperComponent} from './admin-microservice-wrapper/admin-microservice-wrapper.component';

export const ADMIN_MICROSERVICE_ROUTES: Routes = [
  {
    path: '',
    component: AdminMicroserviceWrapperComponent,
    data: { breadcrumb: null }
  }
];

@NgModule({
  imports: [RouterModule.forChild(ADMIN_MICROSERVICE_ROUTES)],
  exports: [RouterModule]
})

export class AdminMicroserviceRoutingModule {
}
