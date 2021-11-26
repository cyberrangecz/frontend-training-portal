import { NgModule } from '@angular/core';
import { GroupDetailComponentsModule } from '@muni-kypo-crp/user-and-group-agenda/group-detail';
import { GroupDetailRoutingModule } from './group-detail-routing.module';
import { KypoDynamicEnvironment } from '../../../../../environments/kypo-dynamic-environment';
import { CommonModule } from '@angular/common';
import { UserAndGroupSharedProvidersModule } from '../../user-and-group-shared-providers.module';

@NgModule({
  imports: [
    CommonModule,
    UserAndGroupSharedProvidersModule,
    GroupDetailRoutingModule,
    GroupDetailComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().userAndGroupAgendaConfig),
  ],
})
export class GroupDetailModule {}
