import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupResolver} from '../../../../services/resolvers/group-resolver.service';
import {GroupBreadcrumbResolver} from '../../../../services/resolvers/group-breadcrumb-resolver.service';
import {AdminGroupDetailWrapperComponent} from './admin-group-detail-wrapper/admin-group-detail-wrapper.component';
import {GroupEditCanDeactivate} from '../../../../services/guards/group-edit-can-deactivate.service';

export const ADMIN_GROUP_DETAIL_ROUTES: Routes = [
  {
    path: '',
    component: AdminGroupDetailWrapperComponent,
    canDeactivate: [GroupEditCanDeactivate],
    resolve: {
      group: GroupResolver,
      breadcrumb: GroupBreadcrumbResolver
    },
  },
];

/**
 * Administration group detail routing
 */
@NgModule({
  imports: [RouterModule.forChild(ADMIN_GROUP_DETAIL_ROUTES)],
  exports: [RouterModule]
})
export class AdminGroupDetailRoutingModule {

}
