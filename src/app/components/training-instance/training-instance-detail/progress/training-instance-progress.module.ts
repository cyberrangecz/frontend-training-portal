import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Kypo2TrainingsHurdlingVizLibModule} from 'kypo2-trainings-hurdling-viz-lib';
import {environment} from '../../../../../environments/environment';
import {TrainingInstanceProgressMaterialModule} from './training-instance-progress-material.module';
import {TrainingInstanceProgressRoutingModule} from './training-instance-progress-routing.module';
import {TrainingInstanceProgressComponent} from './training-instance-progress.component';

/**
 * Component imports, declarations and providers for training instance progress page
 */
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
