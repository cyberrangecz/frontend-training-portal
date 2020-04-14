import {NgModule} from '@angular/core';
import {TrainingInstanceResultsRoutingModule} from './training-instance-results-routing.module';
import {TrainingInstanceResultsComponentsModule} from 'kypo-training-agenda';
import {CommonModule} from '@angular/common';
import {DynamicEnvironment} from '../../../../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceResultsComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingInstanceResultsRoutingModule
  ],
})
export class TrainingInstanceResultsModule {

}
