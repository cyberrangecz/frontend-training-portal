import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GroupEditComponentsModule } from '@crczp/user-and-group-agenda/group-edit';
import { PortalDynamicEnvironment } from '../../../../../environments/portal-dynamic-environment';
import { UserAndGroupSharedProvidersModule } from '../../user-and-group-shared-providers.module';
import { GroupEditRoutingModule } from './group-edit-routing.module';

@NgModule({
    imports: [
        CommonModule,
        UserAndGroupSharedProvidersModule,
        GroupEditRoutingModule,
        GroupEditComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().userAndGroupAgendaConfig),
    ],
})
export class GroupEditModule {}
