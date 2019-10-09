import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {UserAndGroupManagementModule} from 'kypo2-user-and-group-management';
import {environment} from '../../../environments/environment';
import {AdminGroupMaterialModule} from './admin-group-material.module';
import { AdminGroupOverviewComponent } from './admin-group-overview/admin-group-overview.component';
import {AdminGroupRoutingModule} from './admin-group-routing.module';

/**
 * Administration of groups module
 */
@NgModule({
  declarations: [
  AdminGroupOverviewComponent
  ],
  imports: [
    CommonModule,
    UserAndGroupManagementModule.forRoot(environment.kypo2UserAndGroupConfig),
    AdminGroupRoutingModule,
    AdminGroupMaterialModule,
  ],
})
export class AdminGroupModule {

}
