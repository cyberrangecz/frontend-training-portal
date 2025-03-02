import { NgModule } from '@angular/core';
import { AdaptiveDefinitionDetailComponentsModule } from '@crczp/training-agenda/definition-detail';
import { AdaptiveDefinitionDetailRoutingModule } from './adaptive-definition-detail-routing.module';
import { PortalDynamicEnvironment } from '../../../../../../environments/portal-dynamic-environment';

@NgModule({
    imports: [
        AdaptiveDefinitionDetailComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        AdaptiveDefinitionDetailRoutingModule,
    ],
})
export class AdaptiveDefinitionDetailModule {}
