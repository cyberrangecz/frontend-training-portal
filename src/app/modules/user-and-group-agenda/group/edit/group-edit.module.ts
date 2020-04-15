import {NgModule} from '@angular/core';
import {UserAndGroupSharedProvidersModule} from '../../user-and-group-shared-providers.module';
import {CommonModule} from '@angular/common';
import {GroupEditComponentsModule} from 'kypo2-user-and-group-management';
import {GroupEditRoutingModule} from './group-edit-routing.module';
import {DynamicEnvironment} from '../../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    UserAndGroupSharedProvidersModule,
    GroupEditRoutingModule,
    GroupEditComponentsModule.forRoot(DynamicEnvironment.getConfig().userAndGroupConfig)
  ]
})
export class GroupEditModule {

}
