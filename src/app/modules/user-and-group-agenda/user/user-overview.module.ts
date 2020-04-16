import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserComponentsModule } from 'kypo2-user-and-group-management';
import { DynamicEnvironment } from '../../../../environments/dynamic-environment';
import { UserAndGroupSharedProvidersModule } from '../user-and-group-shared-providers.module';
import { UserOverviewRoutingModule } from './user-overview-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserAndGroupSharedProvidersModule,
    UserOverviewRoutingModule,
    UserComponentsModule.forRoot(DynamicEnvironment.getConfig().userAndGroupConfig),
  ],
})
export class UserOverviewModule {}
