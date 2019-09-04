import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { GameLevelEditComponent } from './game-level-edit/game-level-edit.component';
import {LevelEditMaterialModule} from './level-edit-material.module';
import { InfoLevelEditComponent } from './info-level-edit/info-level-edit.component';
import { AssessmentLevelEditComponent } from './assessment-level-edit/assessment-level-edit.component';
import { AbstractLevelEditComponent } from './abstract-level-edit.component';
import { HintStepperComponent } from './game-level-edit/hint-edit/hint-stepper/hint-stepper.component';
import { HintDetailEditComponent } from './game-level-edit/hint-edit/hint-detail-edit/hint-detail-edit.component';
import { QuestionsOverviewComponent } from './assessment-level-edit/question-edit/questions-overview/questions-overview.component';
import { QuestionEditComponent } from './assessment-level-edit/question-edit/question-edit/question-edit.component';
import { FreeFormQuestionEditComponent } from './assessment-level-edit/question-edit/free-form-question-edit/free-form-question-edit.component';
import { MultipleChoiceQuestionEditComponent } from './assessment-level-edit/question-edit/multiple-choice-question-edit/multiple-choice-question-edit.component';
import { ExtendedMatchingItemsEditComponent } from './assessment-level-edit/question-edit/extended-matching-items-edit/extended-matching-items-edit.component';
import {MarkdownEditorModule} from 'kypo2-markdown-editor';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {Kypo2StepperModule} from 'kypo2-stepper';
import {environment} from '../../../../../environments/environment';

/**
 * Module containing components service and routing related to level edit/detail
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MarkdownEditorModule.forRoot(environment.markdownConfig),
    Kypo2StepperModule,
    LevelEditMaterialModule,
    MatSlideToggleModule,
    ReactiveFormsModule
  ],
  exports: [
    AbstractLevelEditComponent
  ],
  declarations: [
  GameLevelEditComponent,
  InfoLevelEditComponent,
  AssessmentLevelEditComponent,
  AbstractLevelEditComponent,
  HintStepperComponent,
  HintDetailEditComponent,
  QuestionsOverviewComponent,
  QuestionEditComponent,
  FreeFormQuestionEditComponent,
  MultipleChoiceQuestionEditComponent,
  ExtendedMatchingItemsEditComponent
  ],
  providers: [
  ]
})

export class LevelEditModule {

}
