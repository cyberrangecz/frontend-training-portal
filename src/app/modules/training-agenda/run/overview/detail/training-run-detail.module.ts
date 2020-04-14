import {NgModule} from '@angular/core';
import {TrainingRunDetailRoutingModule} from './training-run-detail-routing.module';
import {TrainingRunDetailGameModule} from 'kypo-training-agenda';
import {CommonModule} from '@angular/common';
import {DynamicEnvironment} from '../../../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    TrainingRunDetailGameModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingRunDetailRoutingModule
  ]
})
export class TrainingRunDetailModule {

}
