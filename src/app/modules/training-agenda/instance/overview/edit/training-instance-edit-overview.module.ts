import {NgModule} from '@angular/core';
import {TrainingInstanceEditOverviewRoutingModule} from './training-instance-edit-overview-routing.module';
import {TrainingInstanceEditOverviewComponentsModule} from 'kypo-training-agenda';
import {CommonModule} from '@angular/common';
import {DynamicEnvironment} from '../../../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceEditOverviewRoutingModule,
    TrainingInstanceEditOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig)
  ]
})
export class TrainingInstanceEditOverviewModule {

}
