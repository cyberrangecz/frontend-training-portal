import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminUserOverviewComponent} from './admin-user-overview/admin-user-overview.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminUserOverviewComponent,
    data: {breadcrumb: null}
  }
];
@NgModule({
  imports: [RouterModule.forChild(ADMIN_ROUTES)],
  exports: [RouterModule]
})
export class AdminUserRoutingModule {

}
