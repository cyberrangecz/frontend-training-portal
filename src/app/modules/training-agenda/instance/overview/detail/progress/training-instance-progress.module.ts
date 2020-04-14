import {NgModule} from '@angular/core';
import {TrainingInstanceProgressRoutingModule} from './training-instance-progress-routing.module';
import {TrainingInstanceProgressComponentsModule} from 'kypo-training-agenda';
import {CommonModule} from '@angular/common';
import {DynamicEnvironment} from '../../../../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceProgressComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingInstanceProgressRoutingModule
  ]
})
export class TrainingInstanceProgressModule {

}
