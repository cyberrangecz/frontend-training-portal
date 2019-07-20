import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TrainingRunLevelMaterialModule} from "./training-run-level-material.module";
import {FormsModule} from "@angular/forms";
import {TrainingRunLevelComponent} from "./training-run-level.component";
import {TrainingRunInfoLevelComponent} from "./training-run-info-level/training-run-info-level.component";
import {TrainingRunGameLevelComponent} from "./training-run-game-level/training-run-game-level.component";
import {TrainingRunAssessmentLevelComponent} from "./training-run-assessment-level/training-run-assessment-level.component";
import {RevealHintDialogComponent} from "./training-run-game-level/user-action-dialogs/reveal-hint-dialog/reveal-hint-dialog.component";
import {RevealSolutionDialogComponent} from "./training-run-game-level/user-action-dialogs/reveal-solution-dialog/reveal-solution-dialog.component";
import {WrongFlagDialogComponent} from "./training-run-game-level/user-action-dialogs/wrong-flag-dialog/wrong-flag-dialog.component";
import {TraineeQuestionComponent} from "./training-run-assessment-level/question/trainee-question.component";
import {FreeFormQuestionTraineeComponent} from "./training-run-assessment-level/question/free-form-question/free-form-question-trainee.component";
import {MultipleChoiceQuestionTraineeComponent} from "./training-run-assessment-level/question/multiple-choice-question/multiple-choice-question-trainee.component";
import {ExtendedMatchingItemsTraineeComponent} from "./training-run-assessment-level/question/extended-matching-items/extended-matching-items-trainee.component";
import {LeaveConfirmationDialogComponent} from "../leave-confirmation-dialog/leave-confirmation-dialog.component";
import {MarkdownModule} from "ngx-markdown";
import {Kypo2TopologyGraphModule} from "kypo2-topology-graph";
import {environment} from '../../../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    Kypo2TopologyGraphModule.forRoot(environment.kypo2TopologyConfig),
    MarkdownModule.forRoot(environment.markdownConfig.markdownParser),
    FormsModule,
    TrainingRunLevelMaterialModule,
  ],
  declarations: [
    TrainingRunLevelComponent,
    TrainingRunInfoLevelComponent,
    TrainingRunGameLevelComponent,
    TrainingRunAssessmentLevelComponent,
    RevealHintDialogComponent,
    RevealSolutionDialogComponent,
    WrongFlagDialogComponent,
    TraineeQuestionComponent,
    FreeFormQuestionTraineeComponent,
    MultipleChoiceQuestionTraineeComponent,
    ExtendedMatchingItemsTraineeComponent,
    LeaveConfirmationDialogComponent
  ],
  exports: [
    TrainingRunLevelComponent,
    TrainingRunInfoLevelComponent,
    TrainingRunGameLevelComponent,
    TrainingRunAssessmentLevelComponent,
    RevealHintDialogComponent,
    RevealSolutionDialogComponent,
    WrongFlagDialogComponent,
    TraineeQuestionComponent,
    FreeFormQuestionTraineeComponent,
    MultipleChoiceQuestionTraineeComponent,
    ExtendedMatchingItemsTraineeComponent,
    LeaveConfirmationDialogComponent
  ],
  entryComponents: [
    LeaveConfirmationDialogComponent,
    RevealHintDialogComponent,
    RevealSolutionDialogComponent,
    WrongFlagDialogComponent
  ]
})
export class TrainingRunLevelComponentModule {

}
