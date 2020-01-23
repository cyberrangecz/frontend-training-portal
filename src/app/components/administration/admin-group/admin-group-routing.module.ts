import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ADMIN_GROUP_EDIT_PATH, ADMIN_GROUP_NEW_PATH} from './admin-group-detail/paths';
import {AdminGroupWrapperComponent} from './admin-group-wrapper/admin-group-wrapper.component';

export const ADMIN_GROUP_ROUTES: Routes = [
  {
    path: '',
    component: AdminGroupWrapperComponent,
  },
  {
    path: ADMIN_GROUP_NEW_PATH,
    loadChildren: () => import('app/components/administration/admin-group/admin-group-detail/admin-group-detail.module').then(m => m.AdminGroupDetailModule),
  },
  {
    path: ':groupId/' + ADMIN_GROUP_EDIT_PATH,
    loadChildren: () => import('app/components/administration/admin-group/admin-group-detail/admin-group-detail.module').then(m => m.AdminGroupDetailModule),
  },
];

/**
 * Administration of groups routing module
 */
@NgModule({
  imports: [RouterModule.forChild(ADMIN_GROUP_ROUTES)],
  exports: [RouterModule]
})
export class AdminGroupRoutingModule {

}
