import { NgModule } from '@angular/core';
import { AdaptiveInstanceDetailComponentsModule } from '@crczp/training-agenda/instance-detail';
import { PortalDynamicEnvironment } from '../../../../../../environments/portal-dynamic-environment';
import { AdaptiveInstanceDetailRoutingModule } from './adaptive-instance-detail-routing.module';

@NgModule({
    imports: [
        AdaptiveInstanceDetailComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        AdaptiveInstanceDetailRoutingModule,
    ],
})
export class AdaptiveInstanceDetailModule {}
