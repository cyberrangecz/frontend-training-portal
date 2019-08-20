import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { TrainingInstanceProgressComponent } from './training-instance-progress.component';
import {TrainingInstanceProgressMaterialModule} from './training-instance-progress-material.module';
import {TrainingInstanceProgressRoutingModule} from './training-instance-progress-routing.module';
import {Kypo2TrainingsHurdlingVizLibModule} from 'kypo2-trainings-hurdling-viz-lib';
import {environment} from '../../../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceProgressMaterialModule,
    TrainingInstanceProgressRoutingModule,
    Kypo2TrainingsHurdlingVizLibModule.forRoot({restBaseUrl: environment.trainingRestBasePath})
  ],
  declarations: [
  TrainingInstanceProgressComponent
  ],
  providers: [
  ]
})

export class TrainingInstanceProgressModule {

}
