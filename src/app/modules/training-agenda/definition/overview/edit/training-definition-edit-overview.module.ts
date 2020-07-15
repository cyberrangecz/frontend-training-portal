import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingDefinitionEditOverviewComponentsModule } from 'kypo-training-agenda/definition-edit';
import { DynamicEnvironment } from '../../../../../../environments/dynamic-environment';
import { TrainingDefinitionEditOverviewRoutingModule } from './training-definition-edit-overview-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingDefinitionEditOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingDefinitionEditOverviewRoutingModule,
  ],
})
export class TrainingDefinitionEditOverviewModule {}
