import {NgModule} from '@angular/core';
import {TrainingInstanceSummaryRoutingModule} from './training-instance-summary-routing.module';
import {TrainingInstanceSummaryComponentsModule} from 'kypo-training-agenda';
import {CommonModule} from '@angular/common';
import {environment} from '../../../../../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceSummaryComponentsModule.forRoot(environment.trainingAgendaConfig),
    TrainingInstanceSummaryRoutingModule
  ]
})
export class TrainingInstanceSummaryModule {

}
