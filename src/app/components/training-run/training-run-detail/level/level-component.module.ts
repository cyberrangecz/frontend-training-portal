import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LevelMaterialModule} from "./level-material.module";
import {FormsModule} from "@angular/forms";
import {AbstractLevelComponent} from "./abstract-level.component";
import {InfoLevelComponent} from "./info-level/info-level.component";
import {GameLevelComponent} from "./game-level/game-level.component";
import {AssessmentLevelComponent} from "./assessment-level/assessment-level.component";
import {RevealHintDialogComponent} from "./game-level/user-action-dialogs/reveal-hint-dialog/reveal-hint-dialog.component";
import {RevealSolutionDialogComponent} from "./game-level/user-action-dialogs/reveal-solution-dialog/reveal-solution-dialog.component";
import {WrongFlagDialogComponent} from "./game-level/user-action-dialogs/wrong-flag-dialog/wrong-flag-dialog.component";
import {TraineeQuestionComponent} from "./assessment-level/question/trainee-question.component";
import {FreeFormQuestionTraineeComponent} from "./assessment-level/question/free-form-question/free-form-question-trainee.component";
import {MultipleChoiceQuestionTraineeComponent} from "./assessment-level/question/multiple-choice-question/multiple-choice-question-trainee.component";
import {ExtendedMatchingItemsTraineeComponent} from "./assessment-level/question/extended-matching-items/extended-matching-items-trainee.component";
import {LeaveConfirmationDialogComponent} from "../leave-confirmation-dialog/leave-confirmation-dialog.component";
import {MarkdownModule} from "ngx-markdown";
import {Kypo2TopologyGraphModule} from "kypo2-topology-graph";
import {environment} from '../../../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    Kypo2TopologyGraphModule.forRoot({
      sandboxRestUrl: environment.sandboxRestBasePath,
      ...environment.kypo2TopologyConfig
    }),
    MarkdownModule.forRoot(environment.markdownConfig.markdownParser),
    FormsModule,
    LevelMaterialModule,
  ],
  declarations: [
    AbstractLevelComponent,
    InfoLevelComponent,
    GameLevelComponent,
    AssessmentLevelComponent,
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
    AbstractLevelComponent,
    InfoLevelComponent,
    GameLevelComponent,
    AssessmentLevelComponent,
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
export class LevelComponentModule {

}
