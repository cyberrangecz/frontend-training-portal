import {NgModule} from '@angular/core';
import {TrainingInstanceResultsRoutingModule} from './training-instance-results-routing.module';
import {TrainingInstanceResultsComponentsModule} from 'kypo-training-agenda';
import {CommonModule} from '@angular/common';
import {environment} from '../../../../../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceResultsComponentsModule.forRoot(environment.trainingAgendaConfig),
    TrainingInstanceResultsRoutingModule
  ]
})
export class TrainingInstanceResultsModule {

}
