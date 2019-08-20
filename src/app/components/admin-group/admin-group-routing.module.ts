import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminGroupOverviewComponent} from "./admin-group-overview/admin-group-overview.component";

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminGroupOverviewComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(ADMIN_ROUTES)],
  exports: [RouterModule]
})
export class AdminGroupRoutingModule {

}
