import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingDefinitionEditOverviewComponentsModule } from '@crczp/training-agenda/definition-edit';
import { PortalDynamicEnvironment } from '../../../../../../environments/portal-dynamic-environment';
import { TrainingDefinitionEditOverviewRoutingModule } from './training-definition-edit-overview-routing.module';

@NgModule({
    imports: [
        CommonModule,
        TrainingDefinitionEditOverviewComponentsModule.forRoot(
            PortalDynamicEnvironment.getConfig().trainingAgendaConfig,
        ),
        TrainingDefinitionEditOverviewRoutingModule,
    ],
})
export class TrainingDefinitionEditOverviewModule {}
