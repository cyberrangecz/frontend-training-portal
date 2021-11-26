import { NgModule } from '@angular/core';
import { AdaptiveDefinitionDetailComponentsModule } from '@muni-kypo-crp/training-agenda/adaptive-definition-detail';
import { AdaptiveDefinitionDetailRoutingModule } from './adaptive-definition-detail-routing.module';
import { KypoDynamicEnvironment } from '../../../../../../environments/kypo-dynamic-environment';

@NgModule({
  imports: [
    AdaptiveDefinitionDetailComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    AdaptiveDefinitionDetailRoutingModule,
  ],
})
export class AdaptiveDefinitionDetailModule {}
