import {NgModule} from '@angular/core';
import {TrainingInstanceDetailRoutingModule} from './training-instance-detail-routing.module';
import {TrainingInstanceDetailComponentsModule} from 'kypo-training-agenda';
import {DynamicEnvironment} from '../../../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    TrainingInstanceDetailComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingInstanceDetailRoutingModule
  ]
})
export class TrainingInstanceDetailModule {

}
