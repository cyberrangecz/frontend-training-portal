import { DynamicEnvironment } from './../../../../environments/dynamic-environment';
import { UserAndGroupSharedProvidersModule } from './../user-and-group-shared-providers.module';
import { MicroserviceOverviewRoutingModule } from './microservice-overview-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KypoUserAndGroupApiModule } from 'kypo-user-and-group-api';
import { MicroserviceOverviewComponentsModule } from 'kypo-user-and-group-agenda/microservice-overview';

@NgModule({
  imports: [
    CommonModule,
    UserAndGroupSharedProvidersModule,
    MicroserviceOverviewRoutingModule,
    MicroserviceOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().userAndGroupAgendaConfig),
    KypoUserAndGroupApiModule.forRoot(DynamicEnvironment.getConfig().userAndGroupApiConfig),
  ],
})
export class MicroserviceOverviewModule {}
