import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserAndGroupManagementModule} from 'kypo2-user-and-group-management';
import {AdminGroupRoutingModule} from './admin-group-routing.module';
import {environment} from '../../../environments/environment';
import {AdminGroupMaterialModule} from './admin-group-material.module';
import { AdminGroupOverviewComponent } from './admin-group-overview/admin-group-overview.component';

@NgModule({
  declarations: [
  AdminGroupOverviewComponent],
  imports: [
    CommonModule,
    UserAndGroupManagementModule.forRoot(environment.kypo2UserAndGroupConfig),
    AdminGroupRoutingModule,
    AdminGroupMaterialModule,
  ],
})
export class AdminGroupModule {

}
