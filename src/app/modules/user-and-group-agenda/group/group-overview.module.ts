import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GroupOverviewComponentsModule } from '@cyberrangecz-platform/user-and-group-agenda/group-overview';
import { UserAndGroupApiModule } from '@cyberrangecz-platform/user-and-group-api';
import { DynamicEnvironment } from '../../../../environments/dynamic-environment';
import { UserAndGroupSharedProvidersModule } from '../user-and-group-shared-providers.module';
import { GroupOverviewRoutingModule } from './group-overview-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserAndGroupSharedProvidersModule,
    GroupOverviewRoutingModule,
    GroupOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().userAndGroupAgendaConfig),
    UserAndGroupApiModule.forRoot(DynamicEnvironment.getConfig().userAndGroupApiConfig),
  ],
})
export class GroupOverviewModule {}
