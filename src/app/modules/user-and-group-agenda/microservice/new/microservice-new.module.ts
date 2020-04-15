import {NgModule} from '@angular/core';
import {UserAndGroupSharedProvidersModule} from '../../user-and-group-shared-providers.module';
import {CommonModule} from '@angular/common';
import {MicroserviceEditComponentsModule} from 'kypo2-user-and-group-management';
import {MicroserviceNewRoutingModule} from './microservice-new-routing.module';
import {DynamicEnvironment} from '../../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    UserAndGroupSharedProvidersModule,
    MicroserviceNewRoutingModule,
    MicroserviceEditComponentsModule.forRoot(DynamicEnvironment.getConfig().userAndGroupConfig)
  ]
})
export class MicroserviceNewModuleModule {

}
