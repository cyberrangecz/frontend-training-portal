import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminOverviewComponent} from './admin-overview/admin-overview.component';
import {GroupManagementComponent, UserManagementComponent} from "kypo2-user-and-group-management";

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'a',
    pathMatch: 'full'
  },
  {
    path: 'a',
    component: AdminOverviewComponent,
    children: [
      {
        path: 'user',
        component: UserManagementComponent,
        outlet: 'tab'
      },
      {
        path: 'group',
        component: GroupManagementComponent,
        outlet: 'tab'
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'user',
        outlet: 'tab'
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(ADMIN_ROUTES)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}
