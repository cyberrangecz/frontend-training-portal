import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TrainingRunAssessmentLevelService} from '../../../../services/training-run/running/training-run-assessment-level.service';
import {TrainingRunGameLevelService} from '../../../../services/training-run/running/training-run-game-level.service';

/**
 * Module containing imports and providers for training run levels
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
