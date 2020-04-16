import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KypoSandboxApiModule } from 'kypo-sandbox-api';
import { TrainingInstanceOverviewComponentsModule } from 'kypo-training-agenda';
import { KypoTrainingApiConfig, KypoTrainingApiModule } from 'kypo-training-api';
import { DynamicEnvironment } from '../../../../../environments/dynamic-environment';
import { TraininigAgendaSharedProvidersModule } from '../../traininig-agenda-shared-providers.module';
import { TrainingInstanceOverviewRoutingModule } from './training-instance-overview-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TraininigAgendaSharedProvidersModule,
    KypoTrainingApiModule.forRoot(DynamicEnvironment.getConfig().trainingApiConfig),
    KypoSandboxApiModule.forRoot(DynamicEnvironment.getConfig().sandboxApiConfig),
    TrainingInstanceOverviewRoutingModule,
    TrainingInstanceOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
  ],
})
export class TrainingInstanceOverviewModule {}
