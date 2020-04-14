import {NgModule} from '@angular/core';
import {TrainingInstanceSummaryRoutingModule} from './training-instance-summary-routing.module';
import {TrainingInstanceSummaryComponentsModule} from 'kypo-training-agenda';
import {CommonModule} from '@angular/common';
import {DynamicEnvironment} from '../../../../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceSummaryComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingInstanceSummaryRoutingModule
  ]
})
export class TrainingInstanceSummaryModule {

}
