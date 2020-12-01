import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MicroserviceOverviewComponentsModule } from '@kypo/user-and-group-agenda/microservice-overview';
import { KypoUserAndGroupApiModule } from '@kypo/user-and-group-api';
import { UserAndGroupSharedProvidersModule } from '../user-and-group-shared-providers.module';
import { MicroserviceOverviewRoutingModule } from './microservice-overview-routing.module';
import { KypoDynamicEnvironment } from '../../../../environments/kypo-dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    UserAndGroupSharedProvidersModule,
    MicroserviceOverviewRoutingModule,
    MicroserviceOverviewComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().userAndGroupAgendaConfig),
    KypoUserAndGroupApiModule.forRoot(KypoDynamicEnvironment.getConfig().userAndGroupApiConfig),
  ],
})
export class MicroserviceOverviewModule {}
