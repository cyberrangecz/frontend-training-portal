import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FreeFormQuestion} from "../../../../../../../model/questions/free-form-question";

@Component({
  selector: 'trainee-free-form-question',
  templateUrl: './free-form-question-trainee.component.html',
  styleUrls: ['./free-form-question-trainee.component.css']
})
/**
 * Component displaying FFQ type of question in the assessment level of a trainees training run
 */
export class FreeFormQuestionTraineeComponent implements OnInit {

  @Input('question') question: FreeFormQuestion;
  @Input('index') index: number;

  answer: string;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Checks whether mandatory questions were answered
   */
  canBeSubmitted(): boolean {
    return true;
  }

  /**
   * Saves changes from user input to question object
   */
  saveChanges() {
  }


  /**
   * Sets values from user input to the question objects
   */
  private setInputValues() {
    this.question.usersAnswer = this.answer;
  }

  /**
   * Validates user input. Call alert service if there are any errors
   */
  private validateInput() {

  }

}
