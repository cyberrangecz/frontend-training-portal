import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {FreeFormQuestion} from '../../../../../../../model/questions/free-form-question';
import {BaseComponent} from '../../../../../../base.component';
import { FreeFormQuestionFormGroup } from './free-form-question-form-group';
import { FormArray, FormControl, Validators } from '@angular/forms';
import {takeWhile, tap} from 'rxjs/operators';
import {AbstractQuestion} from '../../../../../../../model/questions/abstract-question';

@Component({
  selector: 'kypo2-free-form-question-edit',
  templateUrl: './free-form-question-edit.component.html',
  styleUrls: ['./free-form-question-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Component for editing a question of type Free Form
 */
export class FreeFormQuestionEditComponent extends BaseComponent implements OnInit, OnChanges {
  @Input() question: FreeFormQuestion;
  @Input() isTest: boolean;
  @Input() required: boolean;
  @Output() questionChange: EventEmitter<FreeFormQuestion> = new EventEmitter();

  freeFormQuestionFormGroup: FreeFormQuestionFormGroup;
  maxQuestionScore = AbstractQuestion.MAX_QUESTION_SCORE;
  maxQuestionPenalty = AbstractQuestion.MAX_QUESTION_PENALTY;

  ngOnInit() {}

  get title() {
    return this.freeFormQuestionFormGroup.formGroup.get('title');
  }
  get answers() {
    return <FormArray>this.freeFormQuestionFormGroup.formGroup.get('answers');
  }
  get score() {
    return this.freeFormQuestionFormGroup.formGroup.get('score');
  }
  get penalty() {
    return this.freeFormQuestionFormGroup.formGroup.get('penalty');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('question' in changes) {
      this.freeFormQuestionFormGroup = new FreeFormQuestionFormGroup(this.question);
      this.checkState();
      this.freeFormQuestionFormGroup.formGroup.valueChanges
        .pipe(
          takeWhile(_ => this.isAlive),
        ).subscribe(_ => this.questionChanged());
    }
    if ('isTest' in changes && !changes['isTest'].isFirstChange()) {
      this.checkState();
      if (!this.isTest) {
        this.penalty.setValue(0);
        this.clearAnswers();
      }
    }
    if ('required' in changes && !changes['required'].isFirstChange()) {
      this.checkState();
      this.requiredChanged();
    }
  }

  /**
   * Reacts when user changes an input
   */
  questionChanged() {
    this.freeFormQuestionFormGroup.formGroup.markAsDirty();
    this.freeFormQuestionFormGroup.setToFFQ(this.question, this.isTest);
    this.questionChange.emit(this.question);
  }

  deleteAnswer(index: number) {
    this.answers.removeAt(index);
    this.questionChanged();
  }

  addAnswer() {
    (this.answers as FormArray).push(new FormControl('', Validators.required));
    this.questionChanged();
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  requiredChanged() {
    if (!this.required) {
      this.score.setValue(0);
    }
  }

  private clearAnswers() {
    this.answers.clear();
    this.questionChanged();
  }

  /**
   * Enables/disables score and penalty form field based on required and isTest inputs
   */
  checkState() {
    if (this.required) {
      this.score.enable();
    } else {
      this.score.disable();
    }
    if (this.isTest) {
      this.freeFormQuestionFormGroup.addAnswersValidator();
    } else {
      this.freeFormQuestionFormGroup.removeAnswersValidator();
    }
    if (this.required && this.isTest) {
      this.penalty.enable();
    } else {
      this.penalty.disable();
    }
    this.freeFormQuestionFormGroup.formGroup.updateValueAndValidity();
  }
}
