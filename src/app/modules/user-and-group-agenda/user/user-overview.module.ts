import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserComponentsModule } from '@cyberrangecz-platform/user-and-group-agenda/user-overview';
import { UserAndGroupApiModule } from '@cyberrangecz-platform/user-and-group-api';
import { UserAndGroupSharedProvidersModule } from '../user-and-group-shared-providers.module';
import { UserOverviewRoutingModule } from './user-overview-routing.module';
import { DynamicEnvironment } from '../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    UserAndGroupSharedProvidersModule,
    UserOverviewRoutingModule,
    UserComponentsModule.forRoot(DynamicEnvironment.getConfig().userAndGroupAgendaConfig),
    UserAndGroupApiModule.forRoot(DynamicEnvironment.getConfig().userAndGroupApiConfig),
  ],
})
export class UserOverviewModule {}
