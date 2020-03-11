import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Kypo2StepperModule} from 'kypo2-stepper';
import {TrainingRunLevelsDeactivateGuard} from '../../../services/guards/training-run-levels-guard.service';
import {LevelModule} from './level/level.module';
import {TrainingRunDetailComponentModule} from './training-run-detail-component.module';
import {TrainingRunDetailRoutingModule} from './training-run-detail-routing.module';
import {TrainingDefinitionApi} from '../../../services/api/training-definition-api.service';
import {TrainingRunApi} from '../../../services/api/training-run-api.service';

/**
 * Module containing imports and providers for training run detail
 */
@NgModule({
  imports: [
    CommonModule,
    LevelModule,
    TrainingRunDetailComponentModule,
    Kypo2StepperModule,
    TrainingRunDetailRoutingModule,
  ],
  declarations: [
  ],
  providers: [
    TrainingRunApi,
    TrainingDefinitionApi,
    TrainingRunLevelsDeactivateGuard
  ]
})
export class TrainingRunDetailModule { }
