import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Kypo2GroupOverviewModule, Kypo2UserAndGroupEventModule} from 'kypo2-user-and-group-management';
import {AdminGroupRoutingModule} from './admin-group-routing.module';
import {AdminGroupWrapperComponent} from './admin-group-wrapper/admin-group-wrapper.component';
import {DynamicEnvironment} from '../../../../environments/dynamic-environment';

/**
 * Administration of groups module
 */
@NgModule({
  declarations: [
  AdminGroupWrapperComponent],
  imports: [
    CommonModule,
    Kypo2GroupOverviewModule.forRoot(DynamicEnvironment.getConfig().userAndGroupConfig),
    Kypo2UserAndGroupEventModule,
    AdminGroupRoutingModule,
  ],
})
export class AdminGroupModule {
}
