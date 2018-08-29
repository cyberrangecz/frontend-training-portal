import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MultipleChoiceQuestion} from "../../../../../../model/questions/multiple-choice-question";
import {AlertService} from "../../../../../../services/event-services/alert.service";
import {AlertTypeEnum} from "../../../../../../enums/alert-type.enum";
import {MatCheckboxChange} from "@angular/material";
import {AssessmentTypeEnum} from "../../../../../../enums/assessment-type.enum";

@Component({
  selector: 'multiple-choice-question',
  templateUrl: './multiple-choice-question.component.html',
  styleUrls: ['./multiple-choice-question.component.css']
})
/**
 * Component of a question of type Multiple Choice Question
 */
export class MultipleChoiceQuestionComponent implements OnInit, OnChanges {

  @Input('question') question: MultipleChoiceQuestion;
  @Input('isTest') isTest: boolean;

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
    if ('isTest' in changes) {
      if (this.isTest) {
        this.required = true;
      }
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
  contentChanged() {
    this.dirty = true;
  }
  /**
   * Deletes all answers selected by user
   */
  clearAnswers() {
    this.correctAnswersIndexes = [];
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
      // TODO: Save to REST
      this.dirty = false;
    }
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
    this.options.splice(index, 1);
    this.removeCorrectAnswer(index);
  }

  /**
   * Adds new option
   */
  addOption() {
    this.options.push('');
  }

  /**
   * Adds correct answer
   * @param index index of the answer which should be marked as correct
   */
  private addCorrectAnswer(index: number) {
    this.correctAnswersIndexes.push(index);
  }

  /**
   * Removes given answer from correct answers
   * @param index index of the answer which should be deleted
   */
  private removeCorrectAnswer(index: number) {
    const indexToRemove = this.correctAnswersIndexes.indexOf(index);
    if (indexToRemove != -1) {
      this.correctAnswersIndexes.splice(indexToRemove, 1);
    }
  }

  /**
   * Sets initial values from passed question object to user inputs
   */
  private setInitialValues() {
    this.title = this.question.title;
    this.options = this.question.options;
    this.correctAnswersIndexes = this.question.correctAnswersIndexes;
    this.score = this.question.score;
    this.penalty = this.question.penalty;
    this.required = this.question.required;
  }

  /**
   * Sets values from user input to the question object
   */
  private setInputValues() {
    this.question.title = this.title;
    this.question.options = this.options;
    this.question.correctAnswersIndexes = this.correctAnswersIndexes;
    this.question.required = this.required;

    if (this.question.required) {
      this.question.penalty = this.penalty;
      this.question.score = this.score;
    } else {
      this.question.penalty = 0;
      this.question.score = 0;
    }
  }

  /**
   * Validates user input and calls alert service if there is an error
   */
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

    if (this.options.length === 0) {
      errorMessage += 'Options cannot be empty\n'
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
