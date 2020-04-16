import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GroupEditComponentsModule } from 'kypo2-user-and-group-management';
import { DynamicEnvironment } from '../../../../../environments/dynamic-environment';
import { UserAndGroupSharedProvidersModule } from '../../user-and-group-shared-providers.module';
import { GroupEditRoutingModule } from './group-edit-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserAndGroupSharedProvidersModule,
    GroupEditRoutingModule,
    GroupEditComponentsModule.forRoot(DynamicEnvironment.getConfig().userAndGroupConfig),
  ],
})
export class GroupEditModule {}
