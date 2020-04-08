import {NgModule} from '@angular/core';
import {TrainingInstanceProgressRoutingModule} from './training-instance-progress-routing.module';
import {TrainingInstanceProgressComponentsModule} from 'kypo-training-agenda';
import {CommonModule} from '@angular/common';
import {environment} from '../../../../../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceProgressComponentsModule.forRoot(environment.trainingAgendaConfig),
    TrainingInstanceProgressRoutingModule
  ]
})
export class TrainingInstanceProgressModule {

}
