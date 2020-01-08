import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Kypo2MicroserviceEditModule, Kypo2UserAndGroupEventModule} from 'kypo2-user-and-group-management';
import {environment} from '../../../../environments/environment';
import {AdminMicroserviceRoutingModule} from './admin-microservice-routing.module';
import { AdminMicroserviceWrapperComponent } from './admin-microservice-wrapper/admin-microservice-wrapper.component';
import {MicroserviceEditCanDeactivate} from '../../../services/guards/microservice-edit-can-deactivate.service';

/**
 * Module of administration microservice
 */
@NgModule({
  imports: [
    CommonModule,
    Kypo2MicroserviceEditModule.forRoot(environment.kypo2UserAndGroupConfig),
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
