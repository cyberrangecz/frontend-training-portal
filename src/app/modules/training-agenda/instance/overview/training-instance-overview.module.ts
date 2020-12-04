import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KypoSandboxApiModule } from '@muni-kypo-crp/sandbox-api';
import { TrainingInstanceOverviewComponentsModule } from '@muni-kypo-crp/training-agenda/instance-overview';
import { KypoTrainingApiModule } from '@muni-kypo-crp/training-api';
import { KypoDynamicEnvironment } from '../../../../../environments/kypo-dynamic-environment';
import { TrainingAgendaSharedProvidersModule } from '../../training-agenda-shared-providers.module';
import { TrainingInstanceOverviewRoutingModule } from './training-instance-overview-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingAgendaSharedProvidersModule,
    KypoTrainingApiModule.forRoot(KypoDynamicEnvironment.getConfig().trainingApiConfig),
    KypoSandboxApiModule.forRoot(KypoDynamicEnvironment.getConfig().sandboxApiConfig),
    TrainingInstanceOverviewRoutingModule,
    TrainingInstanceOverviewComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
  ],
})
export class TrainingInstanceOverviewModule {}
