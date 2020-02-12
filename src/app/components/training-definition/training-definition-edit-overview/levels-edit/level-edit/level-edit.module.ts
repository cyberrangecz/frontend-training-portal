import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MarkdownEditorModule} from 'kypo2-markdown-editor';
import {Kypo2StepperModule} from 'kypo2-stepper';
import {SharedModule} from '../../../../shared/shared.module';
import {AbstractLevelEditComponent} from './abstract-level-edit.component';
import {AssessmentLevelEditComponent} from './assessment-level-edit/assessment-level-edit.component';
import {ExtendedMatchingItemsEditComponent} from './assessment-level-edit/question-edit/extended-matching-items-edit/extended-matching-items-edit.component';
import {FreeFormQuestionEditComponent} from './assessment-level-edit/question-edit/free-form-question-edit/free-form-question-edit.component';
import {MultipleChoiceQuestionEditComponent} from './assessment-level-edit/question-edit/multiple-choice-question-edit/multiple-choice-question-edit.component';
import {QuestionControlsComponent} from './assessment-level-edit/question-edit/question-controls/question-controls.component';
import {QuestionEditComponent} from './assessment-level-edit/question-edit/question-edit/question-edit.component';
import {QuestionsOverviewComponent} from './assessment-level-edit/question-edit/questions-overview/questions-overview.component';
import {GameLevelEditComponent} from './game-level-edit/game-level-edit.component';
import {HintControlsComponent} from './game-level-edit/hint-edit/hint-controls/hint-controls.component';
import {HintDetailEditComponent} from './game-level-edit/hint-edit/hint-detail-edit/hint-detail-edit.component';
import {HintsOverviewComponent} from './game-level-edit/hint-edit/hints-overview/hints-overview.component';
import {InfoLevelEditComponent} from './info-level-edit/info-level-edit.component';
import {LevelEditMaterialModule} from './level-edit-material.module';
import {HttpClient} from '@angular/common/http';
import {MarkedOptions} from 'ngx-markdown';

const markdownConfig = {
    markdownParser: {
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
        },
      }
    },
    markdownEditor: {
      fileUploadRestUrl: ''
    }
  };

/**
 * Module containing components and providers related to level edit/detail
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MarkdownEditorModule.forRoot(markdownConfig),
    Kypo2StepperModule,
    LevelEditMaterialModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    AbstractLevelEditComponent
  ],
  declarations: [
  GameLevelEditComponent,
  InfoLevelEditComponent,
  AssessmentLevelEditComponent,
  AbstractLevelEditComponent,
  HintsOverviewComponent,
  HintDetailEditComponent,
  QuestionsOverviewComponent,
  QuestionEditComponent,
  FreeFormQuestionEditComponent,
  MultipleChoiceQuestionEditComponent,
  ExtendedMatchingItemsEditComponent,
  QuestionControlsComponent,
  HintControlsComponent
  ],
  providers: [
  ]
})

export class LevelEditModule {

}
