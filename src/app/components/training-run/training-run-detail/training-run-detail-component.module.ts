import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Kypo2StepperModule} from 'kypo2-stepper';
import {PipesModule} from '../../../pipes/pipes.module';
import {LevelComponentModule} from './level/level-component.module';
import {TrainingRunDetailMaterialModule} from './training-run-detail-material.module';
import {TrainingRunDetailComponent} from './training-run-detail.component';
import {TrainingTimerComponent} from './training-timer/training-timer.component';
import {CsirtUserCardModule} from 'csirt-mu-layout';

/**
 * Contains all components of training run detail
 */
@NgModule({
  imports: [
    CommonModule,
    TrainingRunDetailMaterialModule,
    RouterModule,
    LevelComponentModule,
    PipesModule,
    Kypo2StepperModule,
    CsirtUserCardModule
  ],
  declarations: [
    TrainingRunDetailComponent,
    TrainingTimerComponent
  ],
  exports: [
    TrainingRunDetailComponent,
    TrainingTimerComponent
  ]
})
export class TrainingRunDetailComponentModule {

}
