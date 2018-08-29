import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FreeFormQuestion} from "../../../../../../model/questions/free-form-question";
import {AlertService} from "../../../../../../services/event-services/alert.service";
import {AlertTypeEnum} from "../../../../../../enums/alert-type.enum";
import {QuestionTypeEnum} from "../../../../../../enums/question-type.enum";

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

  title: string;
  answer: string;

  dirty = false;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('question' in changes) {
      this.setInitialValues();
    }
  }

  /**
   * Reacts when user changes an input
   */
  contentChanged() {
    this.dirty = true;
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
  }

  /**
   * Sets values from user input to the question object
   */
  private setInputValues() {
    this.question.title = this.title;
    this.question.correctAnswer = this.answer;
    if (this.answer) {
      this.question.type = QuestionTypeEnum.Test;
    } else {
      this.question.type = QuestionTypeEnum.Assessment;
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

    if (errorMessage !== '') {
      this.alertService.emitAlert(AlertTypeEnum.Error, errorTitle + errorMessage);
      return false;
    }
    return true;
  }
}
