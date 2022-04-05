import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingDefinitionOverviewComponentsModule } from '@muni-kypo-crp/training-agenda/definition-overview';
import { KypoTrainingApiModule } from '@muni-kypo-crp/training-api';
import { KypoDynamicEnvironment } from '../../../../../environments/kypo-dynamic-environment';
import { TrainingAgendaSharedProvidersModule } from '../../training-agenda-shared-providers.module';
import { TrainingDefinitionOverviewRoutingModule } from './training-definition-overview-routing.module';
import { KypoSandboxApiModule } from '@muni-kypo-crp/sandbox-api';

@NgModule({
  imports: [
    CommonModule,
    TrainingAgendaSharedProvidersModule,
    TrainingDefinitionOverviewRoutingModule,
    KypoSandboxApiModule.forRoot(KypoDynamicEnvironment.getConfig().sandboxApiConfig),
    KypoTrainingApiModule.forRoot(KypoDynamicEnvironment.getConfig().trainingApiConfig),
    TrainingDefinitionOverviewComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
  ],
})
export class TrainingDefinitionOverviewModule {}
