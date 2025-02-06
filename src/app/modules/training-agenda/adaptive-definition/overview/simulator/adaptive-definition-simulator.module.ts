import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KypoDynamicEnvironment } from '../../../../../../environments/kypo-dynamic-environment';
import { AdaptiveDefinitionSimulatorRoutingModule } from './adaptive-definition-simulator-routing.module';
import { AdaptiveDefinitionSimulatorComponentsModule } from '@cyberrangecz-platform/training-agenda/adaptive-definition-simulator';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveDefinitionSimulatorComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    AdaptiveDefinitionSimulatorRoutingModule,
  ],
})
export class AdaptiveDefinitionSimulatorModule {}
