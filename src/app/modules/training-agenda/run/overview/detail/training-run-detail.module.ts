import {NgModule} from '@angular/core';
import {TrainingRunDetailRoutingModule} from './training-run-detail-routing.module';
import {TrainingRunDetailGameModule} from 'kypo-training-agenda';
import {CommonModule} from '@angular/common';
import {environment} from '../../../../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    TrainingRunDetailGameModule.forRoot(environment.trainingAgendaConfig),
    TrainingRunDetailRoutingModule
  ]
})
export class TrainingRunDetailModule {

}
