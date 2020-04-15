import {NgModule} from '@angular/core';
import {UserAndGroupSharedProvidersModule} from '../user-and-group-shared-providers.module';
import {CommonModule} from '@angular/common';
import {UserOverviewRoutingModule} from './user-overview-routing.module';
import {UserComponentsModule} from 'kypo2-user-and-group-management';
import {DynamicEnvironment} from '../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    UserAndGroupSharedProvidersModule,
    UserOverviewRoutingModule,
    UserComponentsModule.forRoot(DynamicEnvironment.getConfig().userAndGroupConfig)
  ]
})
export class UserOverviewModule {

}
