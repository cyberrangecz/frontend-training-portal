import {NgModule} from '@angular/core';
import {TrainingInstanceDetailRoutingModule} from './training-instance-detail-routing.module';
import {TrainingInstanceDetailComponentsModule} from 'kypo-training-agenda';
import {environment} from '../../../../../../environments/environment';

@NgModule({
  imports: [
    TrainingInstanceDetailComponentsModule.forRoot(environment.trainingAgendaConfig),
    TrainingInstanceDetailRoutingModule
  ]
})
export class TrainingInstanceDetailModule {

}
