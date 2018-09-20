import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FreeFormQuestion} from "../../../../../../../model/questions/free-form-question";
import {AlertService} from "../../../../../../../services/event-services/alert.service";
import {AlertTypeEnum} from "../../../../../../../enums/alert-type.enum";
import {environment} from "../../../../../../../../environments/environment";

@Component({
  selector: 'free-form-question',
  templateUrl: './free-form-question.component.html',
  styleUrls: ['./free-form-question.component.css']
})
/**
 * Component of a question of type Free Form
 */
export class FreeFormQuestionComponent implements OnInit, OnChanges {

  @Input('question') question: FreeFormQuestion;
  @Input('isTest') isTest: boolean;

  @Output('question') questionChange = new EventEmitter();

  title: string;
  answer: string;
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
   * Reacts when user changes an input
   */
  contentChanged() {
    this.dirty = true;
    this.questionChange.emit();
  }

  /**
   * Determines whether the user has saved all his work and can leave the component
   * @returns {boolean} true if does not have any unsaved changes, false otherwise
   */
  canDeactivate(): boolean {
    return !this.dirty;
  }

  /**
   * Validates input and saves it through REST
   */
  saveChanges() {
    if (this.validateInput()) {
      this.setInputValues();
      // TODO: Save to REST
      this.dirty = false;
    }
  }

  /**
   * Sets initial values from passed question to the user input components
   */
  private setInitialValues() {
    this.title = this.question.title;
    this.answer = this.question.correctAnswer;
    this.score = this.question.score;
    this.penalty = this.question.penalty;
    this.required = this.question.required;
  }

  /**
   * Sets values from user input to the question object
   */
  private setInputValues() {
    this.question.title = this.title;
    this.question.correctAnswer = this.answer;
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
   * Validates user input, calls alert service if there is an error
   */
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

    if (errorMessage !== '') {
      this.alertService.emitAlert(AlertTypeEnum.Error, errorTitle + errorMessage);
      return false;
    }
    return true;
  }
}
