import { NgModule } from '@angular/core';
import { GroupDetailComponentsModule } from '@crczp/user-and-group-agenda/group-detail';
import { GroupDetailRoutingModule } from './group-detail-routing.module';
import { PortalDynamicEnvironment } from '../../../../../environments/portal-dynamic-environment';
import { CommonModule } from '@angular/common';
import { UserAndGroupSharedProvidersModule } from '../../user-and-group-shared-providers.module';

@NgModule({
    imports: [
        CommonModule,
        UserAndGroupSharedProvidersModule,
        GroupDetailRoutingModule,
        GroupDetailComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().userAndGroupAgendaConfig),
    ],
})
export class GroupDetailModule {}
