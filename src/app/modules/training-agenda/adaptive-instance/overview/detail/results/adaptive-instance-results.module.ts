import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalDynamicEnvironment } from '../../../../../../../environments/portal-dynamic-environment';
import { AdaptiveInstanceResultsRoutingModule } from './adaptive-instance-results-routing.module';
import { AdaptiveInstanceResultsComponentsModule } from '@crczp/training-agenda/adaptive-instance-results';

@NgModule({
    imports: [
        CommonModule,
        AdaptiveInstanceResultsComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        AdaptiveInstanceResultsRoutingModule,
    ],
})
export class AdaptiveInstanceResultsModule {}
