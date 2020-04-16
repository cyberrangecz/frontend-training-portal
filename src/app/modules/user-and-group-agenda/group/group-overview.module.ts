import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GroupOverviewComponentsModule } from 'kypo2-user-and-group-management';
import { DynamicEnvironment } from '../../../../environments/dynamic-environment';
import { UserAndGroupSharedProvidersModule } from '../user-and-group-shared-providers.module';
import { GroupOverviewRoutingModule } from './group-overview-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserAndGroupSharedProvidersModule,
    GroupOverviewRoutingModule,
    GroupOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().userAndGroupConfig),
  ],
})
export class GroupOverviewModule {}
