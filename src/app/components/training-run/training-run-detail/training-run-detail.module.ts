import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {Kypo2StepperModule} from 'kypo2-stepper';
import {TrainingDefinitionFacadeModule} from '../../../services/facades/modules/training-definition-facade.module';
import {TrainingRunFacadeModule} from '../../../services/facades/modules/training-run-facade.module';
import {TrainingRunLevelsGuard} from '../../../services/guards/training-run-levels-guard.service';
import {LevelModule} from './level/level.module';
import {TrainingRunDetailComponentModule} from './training-run-detail-component.module';
import {TrainingRunDetailRoutingModule} from './training-run-detail-routing.module';

/**
 * Module containing components and routes for training run detail (game)
 */
@NgModule({
  imports: [
    CommonModule,
    LevelModule,
    TrainingRunDetailComponentModule,
    TrainingDefinitionFacadeModule,
    TrainingRunFacadeModule,
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
