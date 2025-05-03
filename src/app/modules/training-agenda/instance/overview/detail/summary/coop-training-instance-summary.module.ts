import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoopTrainingInstanceSummaryComponentsModule } from '@crczp/training-agenda/instance-summary';
import { CoopTrainingInstanceSummaryRoutingModule } from './coop-training-instance-summary-routing.module';
import { PortalDynamicEnvironment } from '../../../../../../../environments/portal-dynamic-environment';

@NgModule({
    imports: [
        CommonModule,
        CoopTrainingInstanceSummaryComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        CoopTrainingInstanceSummaryRoutingModule,
    ],
})
export class CoopTrainingInstanceSummaryModule {}
