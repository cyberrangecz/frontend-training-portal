import { NgModule } from '@angular/core';
import { GroupDetailComponentsModule } from '@cyberrangecz-platform/user-and-group-agenda/group-detail';
import { GroupDetailRoutingModule } from './group-detail-routing.module';
import { DynamicEnvironment } from '../../../../../environments/dynamic-environment';
import { CommonModule } from '@angular/common';
import { UserAndGroupSharedProvidersModule } from '../../user-and-group-shared-providers.module';

@NgModule({
  imports: [
    CommonModule,
    UserAndGroupSharedProvidersModule,
    GroupDetailRoutingModule,
    GroupDetailComponentsModule.forRoot(DynamicEnvironment.getConfig().userAndGroupAgendaConfig),
  ],
})
export class GroupDetailModule {}
