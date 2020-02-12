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
import {FormArray, FormControl, Validators} from '@angular/forms';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {takeWhile} from 'rxjs/operators';
import {Question} from '../../../../../../../../model/questions/question';
import {MultipleChoiceQuestion} from '../../../../../../../../model/questions/multiple-choice-question';
import {BaseComponent} from '../../../../../../../base.component';
import {MultipleChoiceFormGroup} from './multiple-choice-question-edit-form-group';

/**
 * Component for editing a question of type Multiple Choice Question
 */
@Component({
  selector: 'kypo2-multiple-choice-question-edit',
  templateUrl: './multiple-choice-question-edit.component.html',
  styleUrls: ['./multiple-choice-question-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleChoiceQuestionEditComponent extends BaseComponent
  implements OnInit, OnChanges {
  @Input() question: MultipleChoiceQuestion;
  @Input() isTest: boolean;
  @Input() required: boolean;
  @Output() questionChange: EventEmitter<MultipleChoiceQuestion> = new EventEmitter();

  multipleChoicesFormGroup: MultipleChoiceFormGroup;
  maxQuestionScore = Question.MAX_QUESTION_SCORE;
  maxQuestionPenalty = Question.MAX_QUESTION_PENALTY;

  constructor() {
    super();
  }

  ngOnInit() {}

  get title() {
    return this.multipleChoicesFormGroup.formGroup.get('title');
  }
  get options() {
    return <FormArray>this.multipleChoicesFormGroup.formGroup.get('options');
  }
  get correctAnswersIndices() {
    return this.multipleChoicesFormGroup.formGroup.get('correctAnswersIndices');
  }
  get score() {
    return this.multipleChoicesFormGroup.formGroup.get('score');
  }
  get penalty() {
    return this.multipleChoicesFormGroup.formGroup.get('penalty');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('question' in changes) {
      this.multipleChoicesFormGroup = new MultipleChoiceFormGroup(this.question);
      this.checkState();
      this.multipleChoicesFormGroup.formGroup.valueChanges
        .pipe(
          takeWhile(_ => this.isAlive)
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
      this.onRequiredChanged();
    }
  }

  /**
   * Helper method to improve *ngFor performance
   * @param index
   * @param item
   */
  trackByFn(index: any, item: any) {
    return index;
  }

  /**
   * Changes internal state of the component and emits change event
   */
  questionChanged() {
    this.multipleChoicesFormGroup.formGroup.markAsDirty();
    this.multipleChoicesFormGroup.setToMCQ(this.question, this.isTest);
    this.questionChange.emit(this.question);
  }

  /**
   * Deletes all answers
   */
  clearAnswers() {
    this.correctAnswersIndices.setValue([]);
    this.questionChanged();
  }

  /**
   * Adds or removes answer from correct answers
   * @param event event of checkbox change
   * @param index index of an answer which has been changed
   */
  onAnswerChanged(event: MatCheckboxChange, index: number) {
    if (event.checked) {
      this.addCorrectAnswer(index);
    } else {
      this.removeCorrectAnswer(index);
    }
  }

  /**
   * Deletes an option (one of the answers)
   * @param index index of the option which should be deleted
   */
  deleteOption(index: number) {
    this.options.removeAt(index);
    this.removeCorrectAnswer(index);
    this.questionChanged();
  }

  /**
   * Adds new option
   */
  addOption() {
    (this.options as FormArray).push(new FormControl('', Validators.required));
    this.questionChanged();
  }

  /**
   * Changes internal state of component if required attribute of answer was changed
   */
  onRequiredChanged() {
    if (!this.required) {
      this.score.setValue(0);
    }
  }

  /**
   * Adds correct answer
   * @param index index of the answer which should be marked as correct
   */
  private addCorrectAnswer(index: number) {
    this.correctAnswersIndices.value.push(index);
    this.questionChanged();
    this.correctAnswersIndices.updateValueAndValidity();
  }

  /**
   * Removes given answer from correct answers
   * @param index index of the answer which should be deleted
   */
  private removeCorrectAnswer(index: number) {
    const indexToRemove = this.correctAnswersIndices.value.indexOf(index);
    if (indexToRemove !== -1) {
      this.correctAnswersIndices.value.splice(indexToRemove, 1);
      this.questionChanged();
      this.correctAnswersIndices.updateValueAndValidity();
    }
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
      this.multipleChoicesFormGroup.addAnswersValidator();
    } else {
      this.multipleChoicesFormGroup.removeAnswersValidator();
    }
    if (this.required && this.isTest) {
      this.penalty.enable();
    } else {
      this.penalty.disable();
    }
    this.multipleChoicesFormGroup.formGroup.updateValueAndValidity();
  }
}
