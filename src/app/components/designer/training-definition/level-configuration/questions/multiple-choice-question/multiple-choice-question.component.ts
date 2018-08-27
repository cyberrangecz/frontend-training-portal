import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MultipleChoiceQuestion} from "../../../../../../model/questions/multiple-choice-question";
import {QuestionTypeEnum} from "../../../../../../enums/question-type.enum";
import {AlertService} from "../../../../../../services/event-services/alert.service";
import {AlertTypeEnum} from "../../../../../../enums/alert-type.enum";
import {MatCheckboxChange} from "@angular/material";

@Component({
  selector: 'multiple-choice-question',
  templateUrl: './multiple-choice-question.component.html',
  styleUrls: ['./multiple-choice-question.component.css']
})
export class MultipleChoiceQuestionComponent implements OnInit, OnChanges {

  @Input('question') question: MultipleChoiceQuestion;

  title: string;
  options: string[];
  correctAnswersIndexes: number[];
  score: number;
  penalty: number;
  required: boolean;

  maxQuestionScore: number = 100;
  maxQuestionPenalty: number = 100;

  dirty = false;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
  }


  ngOnChanges(changes: SimpleChanges): void {
    if ('question' in changes) {
      this.setInitialValues();
    }
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

  onAnswerChanged(event: MatCheckboxChange, index: number) {
    if (event.checked) {
      this.correctAnswersIndexes.push(index);
    } else {
      this.removeFromCorrectAnswer(index);
    }
  }

  deleteOption(index: number) {
    this.options.splice(index, 1);
    this.removeFromCorrectAnswer(index);
  }

  addOption() {
    this.options.push('');
  }

  private removeFromCorrectAnswer(index: number) {
    const indexToRemove = this.correctAnswersIndexes.indexOf(index);
    if (indexToRemove != -1) {
      this.correctAnswersIndexes.splice(indexToRemove, 1);
    }
  }

  private setInitialValues() {
    this.title = this.question.title;
    this.options = this.question.options;
    this.correctAnswersIndexes = this.question.correctAnswersIndexes;
    this.score = this.question.score;
    this.penalty = this.question.penalty;
    this.required = this.question.required;
  }

  private setInputValues() {
    this.question.title = this.title;
    this.question.options = this.options;
    this.question.correctAnswersIndexes = this.correctAnswersIndexes;
    this.question.penalty = this.penalty;
    this.question.score = this.score;
    this.question.required = this.required;

    if (this.correctAnswersIndexes.length > 0) {
      this.question.type = QuestionTypeEnum.Test;
    } else {
      this.question.type = QuestionTypeEnum.Assessment;
    }
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

    for (let i = 0; i < this.options.length; i++) {
      if (!this.options[i] || this.options[i].replace(/\s/g, '') === '') {
        errorMessage += (i + 1) + '. option cannot be empty\n'
      }
    }

    if (errorMessage !== '') {
      this.alertService.emitAlert(AlertTypeEnum.Error, errorTitle + errorMessage);
      return false;
    }
    return true;
  }
}
