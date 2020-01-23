import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminUserWrapperComponent} from './admin-user-wrapper/admin-user-wrapper.component';

export const ADMIN_USER_ROUTES: Routes = [
  {
    path: '',
    component: AdminUserWrapperComponent,
  }
];

/**
 * Administration of users routing
 */
@NgModule({
  imports: [RouterModule.forChild(ADMIN_USER_ROUTES)],
  exports: [RouterModule]
})
export class AdminUserRoutingModule {

}
