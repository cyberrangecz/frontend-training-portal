import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TrainingRunGameLevelService} from '../../../../services/training-run/training-run-game-level.service';
import {TrainingRunAssessmentLevelService} from '../../../../services/training-run/training-run-assessment-level.service';

/**
 * Module containing components and service for training run levels
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
  ],
  providers: [
    TrainingRunGameLevelService,
    TrainingRunAssessmentLevelService
  ],
})

export class LevelModule {
}
