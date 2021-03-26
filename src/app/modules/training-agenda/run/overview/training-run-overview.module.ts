import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingRunOverviewComponentsModule } from '@muni-kypo-crp/training-agenda/run-overview';
import { KypoTrainingApiModule } from '@muni-kypo-crp/training-api';
import { KypoDynamicEnvironment } from '../../../../../environments/kypo-dynamic-environment';
import { TrainingAgendaSharedProvidersModule } from '../../training-agenda-shared-providers.module';
import { TrainingRunOverviewRoutingModule } from './training-run-overview-routing.module';
import { KypoSandboxApiModule } from '@muni-kypo-crp/sandbox-api';

@NgModule({
  imports: [
    CommonModule,
    TrainingAgendaSharedProvidersModule,
    KypoTrainingApiModule.forRoot(KypoDynamicEnvironment.getConfig().trainingApiConfig),
    KypoSandboxApiModule.forRoot(KypoDynamicEnvironment.getConfig().sandboxApiConfig),
    TrainingRunOverviewComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingRunOverviewRoutingModule,
  ],
})
export class TrainingRunOverviewModule {}
