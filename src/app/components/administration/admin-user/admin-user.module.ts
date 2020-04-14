import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Kypo2UserAndGroupEventModule, Kypo2UserModule} from 'kypo2-user-and-group-management';
import {AdminUserRoutingModule} from './admin-user-routing.module';
import {AdminUserWrapperComponent} from './admin-user-wrapper/admin-user-wrapper.component';
import {DynamicEnvironment} from '../../../../environments/dynamic-environment';

/**
 * Administration of users module
 */
@NgModule({
  imports: [
    CommonModule,
    Kypo2UserModule.forRoot(DynamicEnvironment.getConfig().userAndGroupConfig),
    Kypo2UserAndGroupEventModule,
    AdminUserRoutingModule,
  ],
  declarations: [AdminUserWrapperComponent],
})
export class AdminUserModule {

}
