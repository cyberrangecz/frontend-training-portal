import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingRunResultsComponentsModule } from 'kypo-training-agenda';
import { DynamicEnvironment } from '../../../../../../environments/dynamic-environment';
import { TrainingRunResultsRoutingModule } from './training-run-results-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingRunResultsComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingRunResultsRoutingModule,
  ],
})
export class TrainingRunResultsModule {}
