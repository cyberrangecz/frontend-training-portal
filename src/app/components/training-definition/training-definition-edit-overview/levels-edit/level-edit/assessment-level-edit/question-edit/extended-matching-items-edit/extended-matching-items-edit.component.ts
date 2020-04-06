import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import {FormArray, FormControl, Validators} from '@angular/forms';
import {MatRadioButton} from '@angular/material/radio';
import {takeWhile} from 'rxjs/operators';
import {Question} from 'kypo-training-model';
import {ExtendedMatchingItems} from 'kypo-training-model';
import {KypoBaseComponent} from 'kypo-common';
import {ExtendedMatchingItemsFormGroup} from './extended-matching-items-form-group';
import { KypoValidators } from 'kypo-common';

/**
 * Component for editing a question of type Extended Matching Items
 */
@Component({
  selector: 'kypo2-extended-matching-items',
  templateUrl: './extended-matching-items-edit.component.html',
  styleUrls: ['./extended-matching-items-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtendedMatchingItemsEditComponent extends KypoBaseComponent
  implements OnInit, OnChanges, AfterViewInit {
  @Input() question: ExtendedMatchingItems;
  @Input() isTest: boolean;
  @Input() required: boolean;
  @Output() questionChange: EventEmitter<ExtendedMatchingItems> = new EventEmitter();

  extendedMatchingQuestionFormGroup: ExtendedMatchingItemsFormGroup;
  maxQuestionScore = Question.MAX_QUESTION_SCORE;
  maxQuestionPenalty = Question.MAX_QUESTION_PENALTY;


  @ViewChildren(MatRadioButton) radioButtons: QueryList<MatRadioButton>;

  constructor() {
    super();
  }

  ngOnInit() {}

  get title() {
    return this.extendedMatchingQuestionFormGroup.formGroup.get('title');
  }
  get rows() {
    return <FormArray>(
      this.extendedMatchingQuestionFormGroup.formGroup.get('rows')
    );
  }
  get cols() {
    return <FormArray>(
      this.extendedMatchingQuestionFormGroup.formGroup.get('cols')
    );
  }
  get correctAnswers() {
    return <FormArray>(
      this.extendedMatchingQuestionFormGroup.formGroup.get('correctAnswers')
    );
  }
  get score() {
    return this.extendedMatchingQuestionFormGroup.formGroup.get('score');
  }
  get penalty() {
    return this.extendedMatchingQuestionFormGroup.formGroup.get('penalty');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('question' in changes) {
      this.extendedMatchingQuestionFormGroup = new ExtendedMatchingItemsFormGroup(this.question);
      this.checkState();
      this.extendedMatchingQuestionFormGroup.formGroup.valueChanges
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

  ngAfterViewInit() {
    this.setInitialStateOfRadioButtons();
  }

  /**
   * Helper method to improve performance of *ngFor directive
   * @param index
   * @param item
   */
  trackByFn(index: any, item: any) {
    return index;
  }

  /**
   * Changes internal state of the component and emits event to parent component
   */
  questionChanged() {
    this.extendedMatchingQuestionFormGroup.formGroup.markAsDirty();
    this.extendedMatchingQuestionFormGroup.setToEMI(this.question, this.isTest);
    this.questionChange.emit(this.question);
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
   * Clears all correct answers
   */
  clearAnswers() {
    this.correctAnswers.clear();
    if (this.radioButtons) {
      this.radioButtons.forEach(button => (button.checked = false));
    }
    this.questionChanged();
  }

  /**
   * Adds answer chosen by a user as a correct answer
   * @param i row coordinate in the matrix representing the possible answers (EMI table)
   * @param j col coordinate in the matrix representing the possible answers (EMI table)
   */
  onAnswerChanged(i: number, j: number) {
    this.deleteAnswerByRow(i);
    this.correctAnswers.push(new FormControl({ x: i, y: j }));
    this.questionChanged();
  }

  /**
   * Deletes row from the EMI table
   * @param index row coordinate in the matrix representing the EMI table
   */
  deleteRow(index: number) {
    this.rows.removeAt(index);
    this.deleteAnswerByRow(index);
    this.questionChanged();
  }

  /**
   * Adds new row to the EMI table
   */
  addRow() {
    this.rows.push(new FormControl('', KypoValidators.noWhitespace));
    this.questionChanged();
  }

  /**
   * Deletes column from the EMI table
   * @param index column coordinate in the matrix representing the EMI table
   */
  deleteColumn(index: number) {
    this.cols.removeAt(index);
    this.deleteAnswersByCol(index);
    this.questionChanged();
  }

  /**
   * Adds new column to the EMI table
   */
  addColumn() {
    this.cols.push(new FormControl('', KypoValidators.noWhitespace));
    this.questionChanged();
  }

  /**
   * Deletes all correct (selected) answers in a given column (usually used after the column itself was deleted)
   * @param colIndex index of a column in a matrix representing the EMI table
   */
  private deleteAnswersByCol(colIndex: number) {
    const answersToDelete = this.correctAnswers.controls.filter(
      answer => answer.value.y === colIndex
    );
    if (answersToDelete.length > 0) {
      answersToDelete.forEach(answerToDelete => {
        const indexOfAnswerToDelete = this.correctAnswers.controls.indexOf(
          answerToDelete
        );
        if (indexOfAnswerToDelete > -1) {
          this.correctAnswers.removeAt(indexOfAnswerToDelete);
        }
      });
    }
  }

  /**
   * Deletes correct (selected) answer in a given row (usually used after the column itself was deleted)
   * @param rowIndex index of a row in a matrix representing the EMI table
   */
  private deleteAnswerByRow(rowIndex: number) {
    const answerToDelete = this.correctAnswers.controls.find(
      answer => answer.value.x === rowIndex
    );
    if (answerToDelete) {
      const indexOfAnswerToDelete = this.correctAnswers.controls.indexOf(
        answerToDelete
      );
      if (indexOfAnswerToDelete > -1) {
        this.correctAnswers.removeAt(indexOfAnswerToDelete);
      }
    }
  }

  /**
   * Sets initial state of every radio button (checked / not checked) based on the correct answers coordinates
   */
  private setInitialStateOfRadioButtons() {
    this.radioButtons.forEach(button => {
      const buttonValue = {
        x: button.value.x,
        y: button.value.y
      };

      if (
        this.correctAnswers.value.find(
          answer => answer.x === buttonValue.x && answer.y === buttonValue.y
        )
      ) {
        button.checked = true;
      }
    });
  }

  /**
   * Changes extendedMatchingQuestionFormGroup based on required and isTest inputs
   */
  private checkState() {
    if (this.required) {
      this.score.enable();
    } else {
      this.score.disable();
    }
    if (this.isTest) {
      this.extendedMatchingQuestionFormGroup.addAnswersValidator();
    } else {
      this.extendedMatchingQuestionFormGroup.removeAnswersValidator();
    }
    if (this.required && this.isTest) {
      this.penalty.enable();
    } else {
      this.penalty.disable();
    }
    this.extendedMatchingQuestionFormGroup.formGroup.updateValueAndValidity();
  }
}
