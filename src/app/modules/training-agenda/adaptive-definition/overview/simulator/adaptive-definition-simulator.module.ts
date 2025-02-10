import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicEnvironment } from '../../../../../../environments/dynamic-environment';
import { AdaptiveDefinitionSimulatorRoutingModule } from './adaptive-definition-simulator-routing.module';
import { AdaptiveDefinitionSimulatorComponentsModule } from '@cyberrangecz-platform/training-agenda/adaptive-definition-simulator';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveDefinitionSimulatorComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    AdaptiveDefinitionSimulatorRoutingModule,
  ],
})
export class AdaptiveDefinitionSimulatorModule {}
