import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PortalDynamicEnvironment } from '../../../../../../environments/portal-dynamic-environment';
import { AdaptiveDefinitionSimulatorRoutingModule } from './adaptive-definition-simulator-routing.module';
import { AdaptiveDefinitionSimulatorComponentsModule } from '@crczp/training-agenda/adaptive-definition-simulator';

@NgModule({
    imports: [
        CommonModule,
        AdaptiveDefinitionSimulatorComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        AdaptiveDefinitionSimulatorRoutingModule,
    ],
})
export class AdaptiveDefinitionSimulatorModule {}
