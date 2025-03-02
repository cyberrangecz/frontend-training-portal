import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserComponentsModule } from '@crczp/user-and-group-agenda/user-overview';
import { UserAndGroupApiModule } from '@crczp/user-and-group-api';
import { UserAndGroupSharedProvidersModule } from '../user-and-group-shared-providers.module';
import { UserOverviewRoutingModule } from './user-overview-routing.module';
import { PortalDynamicEnvironment } from '../../../../environments/portal-dynamic-environment';

@NgModule({
    imports: [
        CommonModule,
        UserAndGroupSharedProvidersModule,
        UserOverviewRoutingModule,
        UserComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().userAndGroupAgendaConfig),
        UserAndGroupApiModule.forRoot(PortalDynamicEnvironment.getConfig().userAndGroupApiConfig),
    ],
})
export class UserOverviewModule {}
