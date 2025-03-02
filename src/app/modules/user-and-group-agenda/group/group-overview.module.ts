import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GroupOverviewComponentsModule } from '@crczp/user-and-group-agenda/group-overview';
import { UserAndGroupApiModule } from '@crczp/user-and-group-api';
import { PortalDynamicEnvironment } from '../../../../environments/portal-dynamic-environment';
import { UserAndGroupSharedProvidersModule } from '../user-and-group-shared-providers.module';
import { GroupOverviewRoutingModule } from './group-overview-routing.module';

@NgModule({
    imports: [
        CommonModule,
        UserAndGroupSharedProvidersModule,
        GroupOverviewRoutingModule,
        GroupOverviewComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().userAndGroupAgendaConfig),
        UserAndGroupApiModule.forRoot(PortalDynamicEnvironment.getConfig().userAndGroupApiConfig),
    ],
})
export class GroupOverviewModule {}
