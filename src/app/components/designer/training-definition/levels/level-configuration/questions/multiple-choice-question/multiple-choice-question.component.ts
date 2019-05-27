import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MultipleChoiceQuestion} from "../../../../../../../model/questions/multiple-choice-question";
import {AlertService} from "../../../../../../../services/shared/alert.service";
import {AlertTypeEnum} from "../../../../../../../model/enums/alert-type.enum";
import {MatCheckboxChange} from "@angular/material";

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
  @Input('required') required: boolean;
  @Output('question') questionChange = new EventEmitter();

  title: string;
  options: string[];
  correctAnswersIndices: number[];
  score: number;
  penalty: number;

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
      if (!this.isTest) {
        this.penalty = 0;
      }
    }
    if ('required' in changes && !changes['required'].isFirstChange()) {
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
  contentChanged() {
    this.dirty = true;
    this.questionChange.emit();
  }
  /**
   * Deletes all answers selected by user
   */
  clearAnswers() {
    this.correctAnswersIndices = [];
    this.contentChanged();
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
    this.contentChanged();
  }

  /**
   * Adds new option
   */
  addOption() {
    this.options.push('');
    this.contentChanged();

  }

  requiredChanged() {
    if (!this.required) {
      this.score = 0;
      this.clearAnswers();
    }
  }

  /**
   * Adds correct answer
   * @param index index of the answer which should be marked as correct
   */
  private addCorrectAnswer(index: number) {
    this.correctAnswersIndices.push(index);
    this.contentChanged();

  }

  /**
   * Removes given answer from correct answers
   * @param index index of the answer which should be deleted
   */
  private removeCorrectAnswer(index: number) {
    const indexToRemove = this.correctAnswersIndices.indexOf(index);
    if (indexToRemove != -1) {
      this.correctAnswersIndices.splice(indexToRemove, 1);
      this.contentChanged();
    }
  }

  /**
   * Sets initial values from passed question object to user inputs
   */
  private setInitialValues() {
    this.title = this.question.title;
    this.options = this.question.options;
    this.correctAnswersIndices = this.question.correctAnswersIndices;
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
    this.question.correctAnswersIndices = this.correctAnswersIndices;
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
   * Validates user input and calls alert service if there is an error
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

    if (this.options.length === 0) {
      errorMessage += 'Options cannot be empty\n'
    }

    for (let i = 0; i < this.options.length; i++) {
      if (!this.options[i] || this.options[i].replace(/\s/g, '') === '') {
        errorMessage += (i + 1) + '. option cannot be empty\n'
      }
    }

    if (this.required && !this.hasSelectedAnswers()) {
      errorMessage += "Required question must have selected correct answers"
    }
    if (errorMessage !== '') {
      this.alertService.emitAlert(AlertTypeEnum.Error, errorTitle + errorMessage);
      return false;
    }
    return true;
  }

  private hasSelectedAnswers(): boolean {
    return this.correctAnswersIndices && this.correctAnswersIndices.length >= 1;
  }
}
