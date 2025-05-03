import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LinearTrainingDefinitionEditOverviewComponentsModule } from '@crczp/training-agenda/definition-edit';
import { LinearTrainingDefinitionEditOverviewRoutingModule } from './linear-training-definition-edit-overview-routing.module';
import { PortalDynamicEnvironment } from '../../../../../../environments/portal-dynamic-environment';

@NgModule({
    imports: [
        CommonModule,
        LinearTrainingDefinitionEditOverviewComponentsModule.forRoot(
            PortalDynamicEnvironment.getConfig().trainingAgendaConfig,
        ),
        LinearTrainingDefinitionEditOverviewRoutingModule,
    ],
})
export class LinearTrainingDefinitionEditOverviewModule {}
