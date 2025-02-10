import { NgModule } from '@angular/core';
import { AdaptiveDefinitionDetailComponentsModule } from '@cyberrangecz-platform/training-agenda/definition-detail';
import { AdaptiveDefinitionDetailRoutingModule } from './adaptive-definition-detail-routing.module';
import { DynamicEnvironment } from '../../../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    AdaptiveDefinitionDetailComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    AdaptiveDefinitionDetailRoutingModule,
  ],
})
export class AdaptiveDefinitionDetailModule {}
