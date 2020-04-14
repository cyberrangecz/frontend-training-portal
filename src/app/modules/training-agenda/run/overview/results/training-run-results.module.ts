import {NgModule} from '@angular/core';
import {TrainingRunResultsRoutingModule} from './training-run-results-routing.module';
import {TrainingRunResultsComponentsModule} from 'kypo-training-agenda';
import {CommonModule} from '@angular/common';
import {DynamicEnvironment} from '../../../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    TrainingRunResultsComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingRunResultsRoutingModule
  ]
})
export class TrainingRunResultsModule {

}
