import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MicroserviceEditComponentsModule } from 'kypo-user-and-group-agenda';
import { KypoUserAndGroupApiModule } from 'kypo-user-and-group-api';
import { DynamicEnvironment } from '../../../../../environments/dynamic-environment';
import { UserAndGroupSharedProvidersModule } from '../../user-and-group-shared-providers.module';
import { MicroserviceNewRoutingModule } from './microservice-new-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserAndGroupSharedProvidersModule,
    MicroserviceNewRoutingModule,
    MicroserviceEditComponentsModule.forRoot(DynamicEnvironment.getConfig().userAndGroupAgendaConfig),
    KypoUserAndGroupApiModule.forRoot(DynamicEnvironment.getConfig().userAndGroupApiConfig),
  ],
})
export class MicroserviceNewModuleModule {}
