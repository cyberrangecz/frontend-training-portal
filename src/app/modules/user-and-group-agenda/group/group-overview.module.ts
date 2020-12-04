import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GroupOverviewComponentsModule } from '@muni-kypo-crp/user-and-group-agenda/group-overview';
import { KypoUserAndGroupApiModule } from '@muni-kypo-crp/user-and-group-api';
import { KypoDynamicEnvironment } from '../../../../environments/kypo-dynamic-environment';
import { UserAndGroupSharedProvidersModule } from '../user-and-group-shared-providers.module';
import { GroupOverviewRoutingModule } from './group-overview-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserAndGroupSharedProvidersModule,
    GroupOverviewRoutingModule,
    GroupOverviewComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().userAndGroupAgendaConfig),
    KypoUserAndGroupApiModule.forRoot(KypoDynamicEnvironment.getConfig().userAndGroupApiConfig),
  ],
})
export class GroupOverviewModule {}
