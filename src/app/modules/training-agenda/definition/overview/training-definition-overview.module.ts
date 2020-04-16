import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingDefinitionOverviewComponentsModule } from 'kypo-training-agenda';
import { KypoTrainingApiModule } from 'kypo-training-api';
import { DynamicEnvironment } from '../../../../../environments/dynamic-environment';
import { TraininigAgendaSharedProvidersModule } from '../../traininig-agenda-shared-providers.module';
import { TrainingDefinitionOverviewRoutingModule } from './training-definition-overview-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TraininigAgendaSharedProvidersModule,
    TrainingDefinitionOverviewRoutingModule,
    KypoTrainingApiModule.forRoot(DynamicEnvironment.getConfig().trainingApiConfig),
    TrainingDefinitionOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
  ],
})
export class TrainingDefinitionOverviewModule {}
