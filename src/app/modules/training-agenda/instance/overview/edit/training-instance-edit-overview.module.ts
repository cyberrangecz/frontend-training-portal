import {NgModule} from '@angular/core';
import {TrainingInstanceEditOverviewRoutingModule} from './training-instance-edit-overview-routing.module';
import {TrainingInstanceEditOverviewComponentsModule} from 'kypo-training-agenda';
import {CommonModule} from '@angular/common';
import {environment} from '../../../../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceEditOverviewRoutingModule,
    TrainingInstanceEditOverviewComponentsModule.forRoot(environment.trainingAgendaConfig)
  ]
})
export class TrainingInstanceEditOverviewModule {

}
