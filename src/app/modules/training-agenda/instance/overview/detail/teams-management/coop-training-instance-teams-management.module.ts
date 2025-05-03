import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoopTrainingInstanceTeamsManagementRoutingModule } from './coop-training-instance-teams-management-routing.module';
import { PortalDynamicEnvironment } from '../../../../../../../environments/portal-dynamic-environment';
import { TeamsManagementComponentsModule } from '@crczp/training-agenda/instance-team-management';

@NgModule({
    imports: [
        CommonModule,
        TeamsManagementComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        CoopTrainingInstanceTeamsManagementRoutingModule,
    ],
})
export class CoopTrainingInstanceTeamsManagementModule {}
