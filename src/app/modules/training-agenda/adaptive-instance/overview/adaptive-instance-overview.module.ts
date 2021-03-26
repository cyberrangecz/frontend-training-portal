import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingAgendaSharedProvidersModule } from '../../training-agenda-shared-providers.module';
import { KypoTrainingApiModule } from '@muni-kypo-crp/training-api';
import { KypoSandboxApiModule } from '@muni-kypo-crp/sandbox-api';
import { AdaptiveInstanceOverviewRoutingModule } from './adaptive-instance-overview-routing.module';
import { KypoDynamicEnvironment } from '../../../../../environments/kypo-dynamic-environment';
import { AdaptiveInstanceOverviewComponentsModule } from '@muni-kypo-crp/training-agenda/adaptive-instance-overview';

@NgModule({
  imports: [
    CommonModule,
    TrainingAgendaSharedProvidersModule,
    KypoTrainingApiModule.forRoot(KypoDynamicEnvironment.getConfig().trainingApiConfig),
    KypoSandboxApiModule.forRoot(KypoDynamicEnvironment.getConfig().sandboxApiConfig),
    AdaptiveInstanceOverviewRoutingModule,
    AdaptiveInstanceOverviewComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
  ],
})
export class AdaptiveInstanceOverviewModule {}
