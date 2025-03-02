import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalDynamicEnvironment } from '../../../../../../../environments/portal-dynamic-environment';
import { AdaptiveInstanceSummaryRoutingModule } from './adaptive-instance-summary-routing.module';
import { AdaptiveInstanceSummaryComponentsModule } from '@crczp/training-agenda/adaptive-instance-summary';

@NgModule({
    imports: [
        CommonModule,
        AdaptiveInstanceSummaryComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        AdaptiveInstanceSummaryRoutingModule,
    ],
})
export class AdaptiveInstanceSummaryModule {}
