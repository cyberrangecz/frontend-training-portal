import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdaptiveRunResultsComponentsModule } from '@crczp/training-agenda/adaptive-run-results';
import { PortalDynamicEnvironment } from '../../../../../../../environments/portal-dynamic-environment';
import { AdaptiveRunResultsRoutingModule } from './adaptive-run-results-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AdaptiveRunResultsComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        AdaptiveRunResultsRoutingModule,
    ],
})
export class AdaptiveRunResultsModule {}
