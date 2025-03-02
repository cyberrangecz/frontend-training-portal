import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdaptiveDefinitionSummaryRoutingModule } from './adaptive-definition-summary-routing.module';
import { AdaptiveDefinitionSummaryComponentsModule } from '@crczp/training-agenda/adaptive-definition-summary';
import { PortalDynamicEnvironment } from '../../../../../../../environments/portal-dynamic-environment';

@NgModule({
    imports: [
        CommonModule,
        AdaptiveDefinitionSummaryComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        AdaptiveDefinitionSummaryRoutingModule,
    ],
})
export class AdaptiveDefinitionSummaryModule {}
