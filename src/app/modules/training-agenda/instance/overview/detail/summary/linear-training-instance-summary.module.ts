import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LinearTrainingInstanceSummaryComponentsModule } from '@crczp/training-agenda/instance-summary';
import { LinearTrainingInstanceSummaryRoutingModule } from './linear-training-instance-summary-routing.module';
import { PortalDynamicEnvironment } from '../../../../../../../environments/portal-dynamic-environment';

@NgModule({
    imports: [
        CommonModule,
        LinearTrainingInstanceSummaryComponentsModule.forRoot(
            PortalDynamicEnvironment.getConfig().trainingAgendaConfig,
        ),
        LinearTrainingInstanceSummaryRoutingModule,
    ],
})
export class LinearTrainingInstanceSummaryModule {}
