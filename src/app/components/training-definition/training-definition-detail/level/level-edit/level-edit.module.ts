import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { GameLevelConfigurationComponent } from './game-level-edit/game-level-configuration.component';
import {LevelEditMaterialModule} from './level-edit-material.module';
import { InfoLevelConfigurationComponent } from './info-level-configuration/info-level-configuration.component';
import { AssessmentLevelEditComponent } from './assessment-level-edit/assessment-level-edit.component';
import { AbstractLevelEditComponent } from './abstract-level-edit.component';
import { HintStepperComponent } from './game-level-edit/hint-edit/hint-stepper/hint-stepper.component';
import { HintDetailEditComponent } from './game-level-edit/hint-edit/hint-detail-edit/hint-detail-edit.component';
import { QuestionsOverviewComponent } from './assessment-level-edit/question-edit/questions-overview/questions-overview.component';
import { QuestionConfigurationComponent } from './assessment-level-edit/question-edit/question-configuration/question-configuration.component';
import { FreeFormQuestionComponent } from './assessment-level-edit/question-edit/free-form-question/free-form-question.component';
import { MultipleChoiceQuestionComponent } from './assessment-level-edit/question-edit/multiple-choice-question/multiple-choice-question.component';
import { ExtendedMatchingItemsComponent } from './assessment-level-edit/question-edit/extended-matching-items/extended-matching-items.component';
import {MarkdownEditorModule} from 'kypo2-markdown-editor';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {environment} from '../../../../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MarkdownEditorModule.forRoot(environment.markdownConfig),
    LevelEditMaterialModule,
    MatSlideToggleModule,
    ReactiveFormsModule
  ],
  exports: [
    AbstractLevelEditComponent
  ],
  declarations: [
  GameLevelConfigurationComponent,
  InfoLevelConfigurationComponent,
  AssessmentLevelEditComponent,
  AbstractLevelEditComponent,
  HintStepperComponent,
  HintDetailEditComponent,
  QuestionsOverviewComponent,
  QuestionConfigurationComponent,
  FreeFormQuestionComponent,
  MultipleChoiceQuestionComponent,
  ExtendedMatchingItemsComponent
  ],
  providers: [
  ]
})

export class LevelEditModule {

}
