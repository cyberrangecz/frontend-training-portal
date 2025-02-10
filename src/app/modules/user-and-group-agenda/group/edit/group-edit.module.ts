import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GroupEditComponentsModule } from '@cyberrangecz-platform/user-and-group-agenda/group-edit';
import { DynamicEnvironment } from '../../../../../environments/dynamic-environment';
import { UserAndGroupSharedProvidersModule } from '../../user-and-group-shared-providers.module';
import { GroupEditRoutingModule } from './group-edit-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserAndGroupSharedProvidersModule,
    GroupEditRoutingModule,
    GroupEditComponentsModule.forRoot(DynamicEnvironment.getConfig().userAndGroupAgendaConfig),
  ],
})
export class GroupEditModule {}
