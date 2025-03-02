import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalDynamicEnvironment } from '../../../../../../../environments/portal-dynamic-environment';
import { AdaptiveRunDetailRoutingModule } from './adaptive-run-detail-routing.module';
import { AdaptiveRunDetailGameModule } from '@crczp/training-agenda/adaptive-run-detail';

@NgModule({
    imports: [
        CommonModule,
        AdaptiveRunDetailGameModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        AdaptiveRunDetailRoutingModule,
    ],
})
export class AdaptiveRunDetailModule {}
