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
import {MultipleChoiceQuestion} from '../../../../../../../model/questions/multiple-choice-question';
import {AlertService} from '../../../../../../../services/shared/alert.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import {BaseComponent} from '../../../../../../base.component';
import { MultipleChoiceFormGroup } from './multiple-choice-question-edit-form-group';
import { FormArray, FormControl, Validators } from '@angular/forms';
import {AbstractQuestion} from '../../../../../../../model/questions/abstract-question';
import {FreeFormQuestionFormGroup} from '../free-form-question-edit/free-form-question-form-group';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'kypo2-multiple-choice-question-edit',
  templateUrl: './multiple-choice-question-edit.component.html',
  styleUrls: ['./multiple-choice-question-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Component for editing a question of type Multiple Choice Question
 */
export class MultipleChoiceQuestionEditComponent extends BaseComponent
  implements OnInit, OnChanges {
  @Input() question: MultipleChoiceQuestion;
  @Input() isTest: boolean;
  @Input() required: boolean;
  @Output() questionChange: EventEmitter<MultipleChoiceQuestion> = new EventEmitter();

  multipleChoicesFormGroup: MultipleChoiceFormGroup;
  maxQuestionScore = AbstractQuestion.MAX_QUESTION_SCORE;
  maxQuestionPenalty = AbstractQuestion.MAX_QUESTION_PENALTY;

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
      this.requiredChanged();
    }
  }

  /**
   * Helper method to enable tracking a variable accessed by *ngFor index
   * @param index
   * @param item
   */
  trackByFn(index: any, item: any) {
    return index;
  }

  /**
   * User made a change in the input
   */
  questionChanged() {
    this.multipleChoicesFormGroup.formGroup.markAsDirty();
    this.multipleChoicesFormGroup.setToMCQ(this.question, this.isTest);
    this.questionChange.emit(this.question);
  }
  /**
   * Deletes all answers selected by user
   */
  clearAnswers() {
    this.correctAnswersIndices.setValue([]);
    this.questionChanged();
  }

  /**
   * Called when user changed the answer (clicked on a checkbox
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

  requiredChanged() {
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
