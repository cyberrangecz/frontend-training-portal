import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FreeFormQuestion} from "../../../../../../../model/questions/free-form-question";
import {AlertService} from "../../../../../../../services/event-services/alert.service";
import {AlertTypeEnum} from "../../../../../../../enums/alert-type.enum";

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
  answers: string[];
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
      else {
        this.penalty = 0;
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
      this.dirty = false;
    }
  }

  removeAnswer(index: number) {
    this.answers.splice(index, 1);
    this.contentChanged()
  }

  addAnswer() {
    this.answers.push("");
    this.contentChanged()
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  requiredChanged() {
    this.score = 0;
    this.clearAnswers();
  }

  private clearAnswers() {
    this.answers = [];
    this.contentChanged();
  }

  /**
   * Sets initial values from passed question to the user input components
   */
  private setInitialValues() {
    this.title = this.question.title;
    this.answers = this.question.correctAnswers ? this.question.correctAnswers : [];
    this.score = this.question.score;
    this.penalty = this.question.penalty;
    this.required = this.question.required;
  }

  /**
   * Sets values from user input to the question object
   */
  private setInputValues() {
    this.question.title = this.title;
    this.question.correctAnswers = this.answers;
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

  validateInput(): boolean {
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

    if (this.required && this.hasEmptyAnswer()) {
      errorMessage += 'Required question must have at least one answer and all must be not empty';
    }

    if (errorMessage !== '') {
      this.alertService.emitAlert(AlertTypeEnum.Error, errorTitle + errorMessage);
      return false;
    }
    return true;
  }

  private hasEmptyAnswer(): boolean {
    return  this.answers.length < 1
      || this.answers.some(answer => answer.replace(/\s/g, '')  === '');
  }
}
