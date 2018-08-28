import {
  AfterViewInit,
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
import {MatRadioButton, MatRadioChange} from "@angular/material";
import index from "@angular/cli/lib/cli";

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

  constructor(private alertService: AlertService) { }

  ngOnInit() {
  }


  ngOnChanges(changes: SimpleChanges): void {
    if ('question' in changes) {
      this.setInitialValues();
    }
  }

  ngAfterViewInit() {
    this.setInitialStateOfRadioButtons();
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
      console.log(this.question);
      // TODO: Save to REST
      this.dirty = false;
    }
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
    this.rows.push("New row");
  }

  deleteColumn(index: number) {
    this.cols.splice(index, 1);
    this.deleteAnswersByCol(index);
  }

  addColumn() {
    this.cols.push("New column");
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
    let errorTitle = 'Question ' + ':\n';
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

/*    for (let i = 0; i < this.options.length; i++) {
      if (!this.options[i] || this.options[i].replace(/\s/g, '') === '') {
        errorMessage += (i + 1) + '. option cannot be empty\n'
      }
    }*/

    if (errorMessage !== '') {
      this.alertService.emitAlert(AlertTypeEnum.Error, errorTitle + errorMessage);
      return false;
    }
    return true;
  }
}
