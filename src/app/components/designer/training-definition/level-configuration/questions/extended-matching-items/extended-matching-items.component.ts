import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import {ExtendedMatchingItems} from "../../../../../../model/questions/extended-matching-items";
import {QuestionTypeEnum} from "../../../../../../enums/question-type.enum";
import {AlertService} from "../../../../../../services/event-services/alert.service";
import {AlertTypeEnum} from "../../../../../../enums/alert-type.enum";
import {MatRadioButton} from "@angular/material";

@Component({
  selector: 'extended-matching-items',
  templateUrl: './extended-matching-items.component.html',
  styleUrls: ['./extended-matching-items.component.css']
})
export class ExtendedMatchingItemsComponent implements OnInit, OnChanges, AfterViewInit {

  @Input('question') question: ExtendedMatchingItems;

  title: string;
  rows: string[];
  cols: string[];
  correctAnswers: { x: number, y:number }[];
  score: number;
  penalty: number;
  required: boolean;

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
  }

  ngAfterViewInit() {
    this.setInitialStateOfRadioButtons();
    this.cdRef.detectChanges();
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  contentChanged() {
    this.dirty = true;
  }

  onScoreChanged() {

  }

  onPenaltyChanged() {

  }

  /**
   * Determines whether the user has saved all his work and can leave the component
   * @returns {boolean} true if does not have any unsaved changes, false otherwise
   */
  canDeactivate(): boolean {
    return !this.dirty;
  }

  saveChanges() {
    if (this.validateInput()) {
      this.setInputValues();
      // TODO: Save to REST
      this.dirty = false;
    }
  }

  clearAnswers() {
    this.correctAnswers = [];
    this.radioButtons.forEach(button => button.checked = false);
  }


  onAnswerChanged(i: number, j: number) {
    this.deleteAnswerByRow(i);
    this.correctAnswers.push({x: i, y: j});
  }

  deleteRow(index: number) {
    this.rows.splice(index, 1);
    this.deleteAnswerByRow(index);
  }

  addRow() {
    this.rows.push("");
  }

  deleteColumn(index: number) {
    this.cols.splice(index, 1);
    this.deleteAnswersByCol(index);
  }

  addColumn() {
    this.cols.push("");
  }

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

  private deleteAnswerByRow(rowIndex: number) {
    const answerToDelete = this.correctAnswers.find(answer => answer.x === rowIndex);
    if (answerToDelete) {
      const indexOfAnswerToDelete = this.correctAnswers.indexOf(answerToDelete);
      if (indexOfAnswerToDelete > -1) {
        this.correctAnswers.splice(indexOfAnswerToDelete, 1);
      }
    }
  }

  private setInitialValues() {
    this.title = this.question.title;
    this.rows = this.question.rows;
    this.cols = this.question.cols;
    this.correctAnswers = this.question.correctAnswers;
    this.score = this.question.score;
    this.penalty = this.question.penalty;
    this.required = this.question.required;
    }

  private setInputValues() {
    this.question.title = this.title;
    this.question.rows = this.rows;
    this.question.cols = this.cols;
    this.question.correctAnswers = this.correctAnswers;
    this.question.penalty = this.penalty;
    this.question.score = this.score;
    this.question.required = this.required;

    if (this.correctAnswers.length > 0) {
      this.question.type = QuestionTypeEnum.Test;
    } else {
      this.question.type = QuestionTypeEnum.Assessment;
    }
  }

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

  private validateInput(): boolean {
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
        errorMessage += (i + 1) + '. row cannot be empty\n'
      }
    }

    for (let i = 0; i < this.cols.length; i++) {
      if (!this.cols[i] || this.cols[i].replace(/\s/g, '') === '') {
        errorMessage += (i + 1) + '. column cannot be empty\n'
      }
    }

    if (this.correctAnswers.length > 0) {
      this.correctAnswers.sort((fst, snd) => fst.x - snd.x);
      for (let i = 0; i < this.rows.length; i++) {
        if (!this.correctAnswers[i]) {
          errorMessage += 'Either none or all answers in EMI have to be selected\n';
          break;
        }
      }
    }

    if (errorMessage !== '') {
      this.alertService.emitAlert(AlertTypeEnum.Error, errorTitle + errorMessage);
      return false;
    }
    return true;
  }
}
