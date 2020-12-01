import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserComponentsModule } from '@kypo/user-and-group-agenda/user-overview';
import { KypoUserAndGroupApiModule } from '@kypo/user-and-group-api';
import { UserAndGroupSharedProvidersModule } from '../user-and-group-shared-providers.module';
import { UserOverviewRoutingModule } from './user-overview-routing.module';
import { KypoDynamicEnvironment } from '../../../../environments/kypo-dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    UserAndGroupSharedProvidersModule,
    UserOverviewRoutingModule,
    UserComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().userAndGroupAgendaConfig),
    KypoUserAndGroupApiModule.forRoot(KypoDynamicEnvironment.getConfig().userAndGroupApiConfig),
  ],
})
export class UserOverviewModule {}
