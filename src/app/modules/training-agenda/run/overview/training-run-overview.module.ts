import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingRunOverviewComponentsModule } from 'kypo-training-agenda';
import { KypoTrainingApiModule } from 'kypo-training-api';
import { DynamicEnvironment } from '../../../../../environments/dynamic-environment';
import { TrainingAgendaSharedProvidersModule } from '../../training-agenda-shared-providers.module';
import { TrainingRunOverviewRoutingModule } from './training-run-overview-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingAgendaSharedProvidersModule,
    KypoTrainingApiModule.forRoot(DynamicEnvironment.getConfig().trainingApiConfig),
    TrainingRunOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingRunOverviewRoutingModule,
  ],
})
export class TrainingRunOverviewModule {}
