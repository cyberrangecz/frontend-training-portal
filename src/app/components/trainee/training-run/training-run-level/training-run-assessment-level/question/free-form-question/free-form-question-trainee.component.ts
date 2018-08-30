import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  @Output('contentChanged') contentChanged: EventEmitter<number> = new EventEmitter();
  answer: string;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Checks whether mandatory questions were answered
   */
  canBeSubmitted(): boolean {
    return !this.question.required || (this.answer && this.answer.replace(/\s/g, '') !== '');
  }

  onChange() {
    this.contentChanged.emit(this.index);
  }

  /**
   * Saves changes from user input to question object
   */
  saveChanges() {
    this.question.usersAnswer = this.answer;
  }


}
