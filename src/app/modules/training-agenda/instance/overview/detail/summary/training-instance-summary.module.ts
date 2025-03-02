import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceSummaryComponentsModule } from '@crczp/training-agenda/instance-summary';
import { PortalDynamicEnvironment } from '../../../../../../../environments/portal-dynamic-environment';
import { TrainingInstanceSummaryRoutingModule } from './training-instance-summary-routing.module';

@NgModule({
    imports: [
        CommonModule,
        TrainingInstanceSummaryComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        TrainingInstanceSummaryRoutingModule,
    ],
})
export class TrainingInstanceSummaryModule {}
