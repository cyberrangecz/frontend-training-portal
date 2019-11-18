import {NgModule} from '@angular/core';
import {
  Kypo2GroupEditCanDeactivate,
  Kypo2GroupEditModule,
  Kypo2GroupResolverHelperService, Kypo2UserAndGroupEventModule
} from 'kypo2-user-and-group-management';
import {GroupResolver} from '../../../../services/resolvers/group-resolver.service';
import {CommonModule} from '@angular/common';
import {AdminGroupDetailRoutingModule} from './admin-group-detail-routing.module';
import {GroupBreadcrumbResolver} from '../../../../services/resolvers/group-breadcrumb-resolver.service';
import { AdminGroupDetailWrapperComponent } from './admin-group-detail-wrapper/admin-group-detail-wrapper.component';

@NgModule({
  imports: [
    CommonModule,
    Kypo2GroupEditModule,
    Kypo2UserAndGroupEventModule,
    AdminGroupDetailRoutingModule,
  ],
  providers: [
    GroupResolver,
    GroupBreadcrumbResolver,
    Kypo2GroupResolverHelperService,
    Kypo2GroupEditCanDeactivate,
  ],
  declarations: [AdminGroupDetailWrapperComponent]
})
export class AdminGroupDetailModule {
}
