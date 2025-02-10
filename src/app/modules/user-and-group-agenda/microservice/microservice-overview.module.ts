import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MicroserviceOverviewComponentsModule } from '@cyberrangecz-platform/user-and-group-agenda/microservice-overview';
import { UserAndGroupApiModule } from '@cyberrangecz-platform/user-and-group-api';
import { UserAndGroupSharedProvidersModule } from '../user-and-group-shared-providers.module';
import { MicroserviceOverviewRoutingModule } from './microservice-overview-routing.module';
import { DynamicEnvironment } from '../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    UserAndGroupSharedProvidersModule,
    MicroserviceOverviewRoutingModule,
    MicroserviceOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().userAndGroupAgendaConfig),
    UserAndGroupApiModule.forRoot(DynamicEnvironment.getConfig().userAndGroupApiConfig),
  ],
})
export class MicroserviceOverviewModule {}
