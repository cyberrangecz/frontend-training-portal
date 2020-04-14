import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  Kypo2MicroserviceEditCanDeactivate,
  Kypo2MicroserviceEditModule,
  Kypo2UserAndGroupEventModule
} from 'kypo2-user-and-group-management';
import {AdminMicroserviceRoutingModule} from './admin-microservice-routing.module';
import {AdminMicroserviceWrapperComponent} from './admin-microservice-wrapper/admin-microservice-wrapper.component';
import {DynamicEnvironment} from '../../../../environments/dynamic-environment';
import {MicroserviceEditCanDeactivate} from '../../../services/guards/microservice-edit-can-deactivate.service';

/**
 * Module of administration microservice
 */
@NgModule({
  imports: [
    CommonModule,
    Kypo2MicroserviceEditModule.forRoot(DynamicEnvironment.getConfig().userAndGroupConfig),
    Kypo2UserAndGroupEventModule,
    AdminMicroserviceRoutingModule,
  ],
  declarations: [AdminMicroserviceWrapperComponent],
  providers: [
    MicroserviceEditCanDeactivate
  ]
})
export class AdminMicroserviceModule {
}
