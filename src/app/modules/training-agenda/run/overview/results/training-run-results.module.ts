import {NgModule} from '@angular/core';
import {TrainingRunResultsRoutingModule} from './training-run-results-routing.module';
import {TrainingRunResultsComponentsModule} from 'kypo-training-agenda';
import {CommonModule} from '@angular/common';
import {environment} from '../../../../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    TrainingRunResultsComponentsModule.forRoot(environment.trainingAgendaConfig),
    TrainingRunResultsRoutingModule
  ]
})
export class TrainingRunResultsModule {

}
