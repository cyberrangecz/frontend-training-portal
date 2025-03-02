import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdaptiveInstanceRunsComponentsModule } from '@crczp/training-agenda/adaptive-instance-runs';
import { AdaptiveInstanceRunsRoutingModule } from './adaptive-instance-runs-routing.module';
import { PortalDynamicEnvironment } from '../../../../../../../environments/portal-dynamic-environment';

@NgModule({
    imports: [
        CommonModule,
        AdaptiveInstanceRunsComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        AdaptiveInstanceRunsRoutingModule,
    ],
})
export class AdaptiveInstanceRunsModule {}
