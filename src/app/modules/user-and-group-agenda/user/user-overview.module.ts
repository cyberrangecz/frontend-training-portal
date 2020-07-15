import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserComponentsModule } from 'kypo-user-and-group-agenda/user-overview';
import { KypoUserAndGroupApiModule } from 'kypo-user-and-group-api';
import { DynamicEnvironment } from '../../../../environments/dynamic-environment';
import { UserAndGroupSharedProvidersModule } from '../user-and-group-shared-providers.module';
import { UserOverviewRoutingModule } from './user-overview-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserAndGroupSharedProvidersModule,
    UserOverviewRoutingModule,
    UserComponentsModule.forRoot(DynamicEnvironment.getConfig().userAndGroupAgendaConfig),
    KypoUserAndGroupApiModule.forRoot(DynamicEnvironment.getConfig().userAndGroupApiConfig),
  ],
})
export class UserOverviewModule {}
