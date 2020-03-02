import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Kypo2StepperModule} from 'kypo2-stepper';
import {PipesModule} from '../../../../pipes/pipes.module';
import {LevelEditService} from '../../../../services/training-definition/edit/level-edit.service';
import {SharedModule} from '../../../shared/shared.module';
import {LevelEditModule} from './level-edit/level-edit.module';
import {LevelOverviewComponent} from './level-overview/level-overview.component';
import {TrainingLevelStepperComponent} from './training-level-stepper/training-level-stepper.component';
import {ControlsModule} from '../../../shared/controls/controls.module';
import {MatDividerModule} from '@angular/material/divider';

/**
 * Module containing component and providers for training definition levels' overview
 */
@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      PipesModule,
      LevelEditModule,
      ReactiveFormsModule,
      SharedModule,
      Kypo2StepperModule,
      MatDividerModule,
      ControlsModule
    ],
  declarations: [
    TrainingLevelStepperComponent,
    LevelOverviewComponent,
  ],
  providers: [
    LevelEditService,
  ],
  exports: [
    LevelOverviewComponent
  ],
})
export class LevelOverviewModule {

}
