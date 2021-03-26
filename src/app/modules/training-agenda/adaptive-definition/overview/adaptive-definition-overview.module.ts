import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingAgendaSharedProvidersModule } from '../../training-agenda-shared-providers.module';
import { AdaptiveDefinitionOverviewRoutingModule } from './adaptive-definition-overview-routing.module';
import { KypoTrainingApiModule } from '@muni-kypo-crp/training-api';
import { KypoDynamicEnvironment } from '../../../../../environments/kypo-dynamic-environment';
import { AdaptiveDefinitionOverviewComponentsModule } from '@muni-kypo-crp/training-agenda/adaptive-definition-overview';

@NgModule({
  imports: [
    CommonModule,
    TrainingAgendaSharedProvidersModule,
    AdaptiveDefinitionOverviewRoutingModule,
    KypoTrainingApiModule.forRoot(KypoDynamicEnvironment.getConfig().trainingApiConfig),
    AdaptiveDefinitionOverviewComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
  ],
})
export class AdaptiveDefinitionOverviewModule {}
