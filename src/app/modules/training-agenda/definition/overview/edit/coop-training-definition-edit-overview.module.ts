import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoopTrainingDefinitionEditOverviewComponentsModule } from '@crczp/training-agenda/definition-edit';
import { CoopTrainingDefinitionEditOverviewRoutingModule } from './coop-training-definition-edit-overview-routing.module';
import { PortalDynamicEnvironment } from '../../../../../../environments/portal-dynamic-environment';

@NgModule({
    imports: [
        CommonModule,
        CoopTrainingDefinitionEditOverviewComponentsModule.forRoot(
            PortalDynamicEnvironment.getConfig().trainingAgendaConfig,
        ),
        CoopTrainingDefinitionEditOverviewRoutingModule,
    ],
})
export class CoopTrainingDefinitionEditOverviewModule {}
