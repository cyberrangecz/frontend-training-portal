import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TrainingRunAssessmentLevelConcreteService} from '../../../../services/training-run/running/training-run-assessment-level-concrete.service';
import {TrainingRunGameLevelConcreteService} from '../../../../services/training-run/running/training-run-game-level-concrete.service';
import {TrainingRunGameLevelService} from '../../../../services/training-run/running/training-run-game-level.service';
import {TrainingRunAssessmentLevelService} from '../../../../services/training-run/running/training-run-assessment-level.service';

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
    {provide: TrainingRunGameLevelService, useClass: TrainingRunGameLevelConcreteService},
    {provide: TrainingRunAssessmentLevelService, useClass: TrainingRunAssessmentLevelConcreteService},
  ],
})

export class LevelModule {
}
