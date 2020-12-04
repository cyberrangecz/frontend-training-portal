import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingDefinitionEditOverviewComponentsModule } from '@muni-kypo-crp/training-agenda/definition-edit';
import { KypoDynamicEnvironment } from '../../../../../../environments/kypo-dynamic-environment';
import { TrainingDefinitionEditOverviewRoutingModule } from './training-definition-edit-overview-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingDefinitionEditOverviewComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingDefinitionEditOverviewRoutingModule,
  ],
})
export class TrainingDefinitionEditOverviewModule {}
