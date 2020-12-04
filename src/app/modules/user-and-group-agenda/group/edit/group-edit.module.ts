import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GroupEditComponentsModule } from '@muni-kypo-crp/user-and-group-agenda/group-edit';
import { KypoDynamicEnvironment } from '../../../../../environments/kypo-dynamic-environment';
import { UserAndGroupSharedProvidersModule } from '../../user-and-group-shared-providers.module';
import { GroupEditRoutingModule } from './group-edit-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserAndGroupSharedProvidersModule,
    GroupEditRoutingModule,
    GroupEditComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().userAndGroupAgendaConfig),
  ],
})
export class GroupEditModule {}
