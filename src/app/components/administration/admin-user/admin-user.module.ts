import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Kypo2UserAndGroupEventModule, Kypo2UserModule} from 'kypo2-user-and-group-management';
import {environment} from '../../../../environments/environment';
import {AdminUserRoutingModule} from './admin-user-routing.module';
import { AdminUserWrapperComponent } from './admin-user-wrapper/admin-user-wrapper.component';
/**
 * Administration of users module
 */
@NgModule({
  imports: [
    CommonModule,
    Kypo2UserModule.forRoot(environment.kypo2UserAndGroupConfig),
    Kypo2UserAndGroupEventModule,
    AdminUserRoutingModule,
  ],
  declarations: [AdminUserWrapperComponent],
})
export class AdminUserModule {

}
