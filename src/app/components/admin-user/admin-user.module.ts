import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {UserAndGroupManagementModule} from 'kypo2-user-and-group-management';
import {environment} from '../../../environments/environment';
import {AdminUserMaterialModule} from './admin-user-material.module';
import { AdminUserOverviewComponent } from './admin-user-overview/admin-user-overview.component';
import {AdminUserRoutingModule} from './admin-user-routing.module';

/**
 * Administration of users module
 */
@NgModule({
  declarations: [
  AdminUserOverviewComponent]
  ,
  imports: [
    CommonModule,
    UserAndGroupManagementModule.forRoot(environment.kypo2UserAndGroupConfig),
    AdminUserRoutingModule,
    AdminUserMaterialModule,
  ],
})
export class AdminUserModule {

}
