import {NgModule} from '@angular/core';
import {UserAndGroupSharedProvidersModule} from '../user-and-group-shared-providers.module';
import {CommonModule} from '@angular/common';
import {GroupOverviewComponentsModule} from 'kypo2-user-and-group-management';
import {GroupOverviewRoutingModule} from './group-overview-routing.module';
import {DynamicEnvironment} from '../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    UserAndGroupSharedProvidersModule,
    GroupOverviewRoutingModule,
    GroupOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().userAndGroupConfig)
  ]
})
export class GroupOverviewModule {

}
