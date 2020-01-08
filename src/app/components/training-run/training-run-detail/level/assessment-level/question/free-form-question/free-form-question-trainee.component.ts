import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractQuestion} from '../../../../../../../model/questions/abstract-question';
import {FreeFormQuestion} from '../../../../../../../model/questions/free-form-question';
import {BaseComponent} from '../../../../../../base.component';

@Component({
  selector: 'kypo2-trainee-free-form-question',
  templateUrl: './free-form-question-trainee.component.html',
  styleUrls: ['./free-form-question-trainee.component.css']
})
/**
 * Component displaying FFQ type of question in the assessment level of a trainees training run.
 * If assessment is type of test or question is required, user needs to answer it, otherwise it is optional.
 */
export class FreeFormQuestionTraineeComponent extends BaseComponent implements OnInit {

  @Input() question: FreeFormQuestion;
  @Input() index: number;

  @Output() contentChanged: EventEmitter<{index: number, question: AbstractQuestion}> = new EventEmitter();
  answer: string;

  ngOnInit() {
  }

  /**
   * Checks whether mandatory questions were answered
   */
  canBeSubmitted(): boolean {
    return !this.question.required || (this.answer && this.answer.replace(/\s/g, '') !== '');
  }

  onChange() {
    this.contentChanged.emit({
      index: this.index,
      question: this.question
    });
  }

  /**
   * Saves changes from user input to question object
   */
  saveChanges() {
    this.question.usersAnswer = this.answer;
  }
}
