import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { GameLevelConfigurationComponent } from './game-level-configuration/game-level-configuration.component';
import {LevelConfigurationMaterialModule} from "./level-configuration-material.module";
import { InfoLevelConfigurationComponent } from './info-level-configuration/info-level-configuration.component';
import { AssessmentLevelConfigurationComponent } from './assessment-level-configuration/assessment-level-configuration.component';
import { LevelConfigurationComponent } from './level-configuration.component';
import {SharedModule} from "../../../shared/shared.module";
import { HintStepperComponent } from './hints/hint-stepper/hint-stepper.component';
import { HintConfigurationComponent } from './hints/hint-configuration/hint-configuration.component';
import { QuestionsOverviewComponent } from './questions/questions-overview/questions-overview.component';
import { QuestionConfigurationComponent } from './questions/question-configuration/question-configuration.component';
import { MarkdownEditorModule } from "markdown-editor-lib";
import { FreeFormQuestionComponent } from './questions/free-form-question/free-form-question.component';
import { MultipleChoiceQuestionComponent } from './questions/multiple-choice-question/multiple-choice-question.component';
import { ExtendedMatchingItemsComponent } from './questions/extended-matching-items/extended-matching-items.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MarkdownEditorModule,
    LevelConfigurationMaterialModule,
    SharedModule,
  ],
  exports: [
    LevelConfigurationComponent
  ],
  declarations: [
  GameLevelConfigurationComponent,
  InfoLevelConfigurationComponent,
  AssessmentLevelConfigurationComponent,
  LevelConfigurationComponent,
  HintStepperComponent,
  HintConfigurationComponent,
  QuestionsOverviewComponent,
  QuestionConfigurationComponent,
  FreeFormQuestionComponent,
  MultipleChoiceQuestionComponent,
  ExtendedMatchingItemsComponent
  ],
  providers: [
  ]
})

export class LevelConfigurationModule {

}
