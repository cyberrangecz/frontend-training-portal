import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MicroserviceOverviewComponentsModule } from '@crczp/user-and-group-agenda/microservice-overview';
import { UserAndGroupApiModule } from '@crczp/user-and-group-api';
import { UserAndGroupSharedProvidersModule } from '../user-and-group-shared-providers.module';
import { MicroserviceOverviewRoutingModule } from './microservice-overview-routing.module';
import { PortalDynamicEnvironment } from '../../../../environments/portal-dynamic-environment';

@NgModule({
    imports: [
        CommonModule,
        UserAndGroupSharedProvidersModule,
        MicroserviceOverviewRoutingModule,
        MicroserviceOverviewComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().userAndGroupAgendaConfig),
        UserAndGroupApiModule.forRoot(PortalDynamicEnvironment.getConfig().userAndGroupApiConfig),
    ],
})
export class MicroserviceOverviewModule {}
