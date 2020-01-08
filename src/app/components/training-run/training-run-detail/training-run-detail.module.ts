import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {Kypo2StepperModule} from 'kypo2-stepper';
import {TrainingDefinitionApiModule} from '../../../services/api/modules/training-definition-api.module';
import {TrainingRunApiModule} from '../../../services/api/modules/training-run-api.module';
import {TrainingRunLevelsGuard} from '../../../services/guards/training-run-levels-guard.service';
import {LevelModule} from './level/level.module';
import {TrainingRunDetailComponentModule} from './training-run-detail-component.module';
import {TrainingRunDetailRoutingModule} from './training-run-detail-routing.module';

/**
 * Module containing imports and providers for training run detail
 */
@NgModule({
  imports: [
    CommonModule,
    LevelModule,
    TrainingRunDetailComponentModule,
    TrainingDefinitionApiModule,
    TrainingRunApiModule,
    Kypo2StepperModule,
    TrainingRunDetailRoutingModule,
  ],
  declarations: [
  ],
  providers: [
    TrainingRunLevelsGuard
  ]
})
export class TrainingRunDetailModule { }
