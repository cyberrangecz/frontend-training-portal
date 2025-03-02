import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingDefinitionSummaryRoutingModule } from './training-definition-summary-routing.module';
import { TrainingDefinitionSummaryComponentsModule } from '@crczp/training-agenda/definition-summary';
import { PortalDynamicEnvironment } from '../../../../../../../environments/portal-dynamic-environment';

@NgModule({
    imports: [
        CommonModule,
        TrainingDefinitionSummaryComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        TrainingDefinitionSummaryRoutingModule,
    ],
})
export class TrainingDefinitionSummaryModule {}
