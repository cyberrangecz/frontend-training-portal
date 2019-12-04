import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminMicroserviceWrapperComponent} from './admin-microservice-wrapper/admin-microservice-wrapper.component';
import {MicroserviceEditCanDeactivate} from '../../../services/guards/microservice-edit-can-deactivate.service';

export const ADMIN_MICROSERVICE_ROUTES: Routes = [
  {
    path: '',
    component: AdminMicroserviceWrapperComponent,
    canDeactivate: [MicroserviceEditCanDeactivate],
    data: { breadcrumb: null }
  }
];

@NgModule({
  imports: [RouterModule.forChild(ADMIN_MICROSERVICE_ROUTES)],
  exports: [RouterModule]
})

export class AdminMicroserviceRoutingModule {
}
