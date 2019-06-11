import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, EventEmitter,
  Input,
  OnChanges,
  OnInit, Output,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import {ExtendedMatchingItems} from "../../../../../../../model/questions/extended-matching-items";
import {AlertService} from "../../../../../../../services/shared/alert.service";
import {AlertTypeEnum} from "../../../../../../../model/enums/alert-type.enum";
import {MatRadioButton} from "@angular/material";

@Component({
  selector: 'extended-matching-items',
  templateUrl: './extended-matching-items.component.html',
  styleUrls: ['./extended-matching-items.component.css']
})
/**
 * Component of a question of type Extended Matching Items
 */
export class ExtendedMatchingItemsComponent implements OnInit, OnChanges, AfterViewInit {

  @Input('question') question: ExtendedMatchingItems;
  @Input('isTest') isTest: boolean;
  @Input('required') required: boolean;

  @Output('question') questionChange = new EventEmitter();

  title: string;
  rows: string[];
  cols: string[];
  correctAnswers: { x: number, y:number }[];
  score: number;
  penalty: number;

  maxQuestionScore: number = 100;
  maxQuestionPenalty: number = 100;

  dirty = false;

  @ViewChildren(MatRadioButton) radioButtons: QueryList<MatRadioButton>;

  constructor(private cdRef:ChangeDetectorRef,
              private alertService: AlertService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('question' in changes) {
      this.setInitialValues();
    }
    if ('isTest' in changes && !changes['isTest'].isFirstChange()) {
      if (!this.isTest) {
        this.penalty = 0;
        this.clearAnswers();
      }
    }
    if ('required' in changes && !changes['required'].isFirstChange()) {
      this.requiredChanged();
    }
  }

  ngAfterViewInit() {
    this.setInitialStateOfRadioButtons();
    this.cdRef.detectChanges();
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
  contentChanged() {
    this.dirty = true;
    this.questionChange.emit();
  }

  requiredChanged() {
    if (!this.required) {
      this.score = 0;
    }
  }

  /**
   * Determines whether the user has saved all his work and can leave the component
   * @returns {boolean} true if does not have any unsaved changes, false otherwise
   */
  canDeactivate(): boolean {
    return !this.dirty;
  }

  /**
   * Validates input and saved data through REST
   */
  saveChanges() {
    if (this.validateInput()) {
      this.setInputValues();
      this.dirty = false;
    }
  }

  /**
   * Clears all correct answers
   */
  clearAnswers() {
    this.correctAnswers = [];
    if (this.radioButtons) {
      this.radioButtons.forEach(button => button.checked = false);
    }
    this.contentChanged();
  }


  /**
   * Adds answer chosen by a user as a correct answer
   * @param i row coordinate in the matrix representing the possible answers (EMI table)
   * @param j col coordinate in the matrix representing the possible answers (EMI table)
   */
  onAnswerChanged(i: number, j: number) {
    this.deleteAnswerByRow(i);
    this.correctAnswers.push({x: i, y: j});
    this.contentChanged();
  }

  /**
   * Deletes row from the EMI table
   * @param index row coordinate in the matrix representing the EMI table
   */
  deleteRow(index: number) {
    this.rows.splice(index, 1);
    this.deleteAnswerByRow(index);
    this.contentChanged();
  }

  /**
   * Adds new row to the EMI table
   */
  addRow() {
    this.rows.push("");
    this.contentChanged();
  }

  /**
   * Deletes column from the EMI table
   * @param index column coordinate in the matrix representing the EMI table
   */
  deleteColumn(index: number) {
    this.cols.splice(index, 1);
    this.deleteAnswersByCol(index);
    this.contentChanged();
  }

  /**
   * Adds new column to the EMI table
   */
  addColumn() {
    this.cols.push("");
    this.contentChanged();
  }

  /**
   * Deletes all correct (selected) answers in a given column (usually used after the column itself was deleted)
   * @param colIndex index of a column in a matrix representing the EMI table
   */
  private deleteAnswersByCol(colIndex: number) {
    const answersToDelete = this.correctAnswers.filter(answer => answer.y === colIndex);
    if (answersToDelete.length > 0) {
      answersToDelete.forEach(answerToDelete => {
        const indexOfAnswerToDelete = this.correctAnswers.indexOf(answerToDelete);
        if (indexOfAnswerToDelete > -1) {
          this.correctAnswers.splice(indexOfAnswerToDelete, 1);
        }
      });
    }
  }

  /**
   * Deletes correct (selected) answer in a given row (usually used after the column itself was deleted)
   * @param rowIndex index of a row in a matrix representing the EMI table
   */
  private deleteAnswerByRow(rowIndex: number) {
    const answerToDelete = this.correctAnswers.find(answer => answer.x === rowIndex);
    if (answerToDelete) {
      const indexOfAnswerToDelete = this.correctAnswers.indexOf(answerToDelete);
      if (indexOfAnswerToDelete > -1) {
        this.correctAnswers.splice(indexOfAnswerToDelete, 1);
      }
    }
  }

  /**
   * Sets initial values from passed question object to user input components
   */
  private setInitialValues() {
    this.title = this.question.title;
    this.rows = this.question.rows;
    this.cols = this.question.cols;
    this.correctAnswers = this.question.correctAnswers;
    this.score = this.question.score;
    this.penalty = this.question.penalty;
    this.required = this.question.required;
    }

  /**
   * Sets values from user input components to the question object
   */
  private setInputValues() {
    this.question.title = this.title;
    this.question.rows = this.rows;
    this.question.cols = this.cols;
    this.question.correctAnswers = this.correctAnswers;
    this.question.required = this.required;

    if (this.question.required) {
      this.question.score = this.score;
    } else {
      this.question.score = 0;
    }
    if (this.isTest) {
      this.question.penalty = this.penalty;
    } else {
      this.question.penalty = 0;
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

      if (this.correctAnswers.find(answer => answer.x === buttonValue.x && answer.y === buttonValue.y)) {
        button.checked = true;
      }
    });
  }

  /**
   * Validates user input and calls alert service if there are any errors
   */
  validateInput(): boolean {
    let errorTitle = 'Question: ' + this.question.title + '\n';
    let errorMessage: string = '';

    if (!this.title || this.title.replace(/\s/g, '') === '') {
      errorMessage += 'Title cannot be empty\n'
    }

    if (Number.isNaN(this.penalty) || this.penalty < 0 || this.penalty > this.maxQuestionPenalty) {
      errorMessage += 'Question penalty must be a number in range from 0 to ' + this.maxQuestionPenalty + '\n'
    }

    if (Number.isNaN(this.score) || this.score < 0 || this.score > this.maxQuestionScore) {
      errorMessage += 'Question score must be a number in range from 0 to ' + this.maxQuestionScore + '\n'
    }

    if (this.rows.length === 0) {
      errorMessage += 'Rows cannot be empty\n'
    }

    if (this.cols.length === 0) {
      errorMessage += 'Columns cannot be empty\n'
    }

    for (let i = 0; i < this.rows.length; i++) {
      if (!this.rows[i] || this.rows[i].replace(/\s/g, '') === '') {
        errorMessage += (i + 1) + '. row title cannot be empty\n'
      }
    }

    for (let i = 0; i < this.cols.length; i++) {
      if (!this.cols[i] || this.cols[i].replace(/\s/g, '') === '') {
        errorMessage += (i + 1) + '. column title cannot be empty\n'
      }
    }

    if (this.isTest && !this.hasSelectedAnswers()) {
      errorMessage += "Test question must have selected correct answers"
    }

    if (errorMessage !== '') {
      this.alertService.emitAlert(AlertTypeEnum.Error, errorTitle + errorMessage);
      return false;
    }
    return true;
  }

  private hasSelectedAnswers() {
    return this.rows.length === this.correctAnswers.length;
  }
}
