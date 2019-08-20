import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminUserOverviewComponent} from './admin-user-overview/admin-user-overview.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminUserOverviewComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(ADMIN_ROUTES)],
  exports: [RouterModule]
})
export class AdminUserRoutingModule {

}
