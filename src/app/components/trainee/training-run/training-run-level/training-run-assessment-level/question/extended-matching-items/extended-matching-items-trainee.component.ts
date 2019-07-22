import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExtendedMatchingItems} from "../../../../../../../model/questions/extended-matching-items";
import {AbstractQuestion} from '../../../../../../../model/questions/abstract-question';
import {BaseComponent} from "../../../../../../base.component";

@Component({
  selector: 'trainee-extended-matching-items',
  templateUrl: './extended-matching-items-trainee.component.html',
  styleUrls: ['./extended-matching-items-trainee.component.css']
})
/**
 * Component displaying EMI type of question in the assessment level of a trainees training run
 */
export class ExtendedMatchingItemsTraineeComponent extends BaseComponent implements OnInit {

  @Input('question') question: ExtendedMatchingItems;
  @Input('index') index: number;

  @Output('contentChanged') contentChanged: EventEmitter<{index: number, question: AbstractQuestion}> = new EventEmitter();

  usersAnswers: {x: number, y: number}[] = [];

  ngOnInit() {
  }

  /**
   * Checks whether all questions were answered
   */
  canBeSubmitted(): boolean {
    if (this.question.required || this.usersAnswers.length > 0) {
      this.usersAnswers.sort((fst, snd) => fst.x - snd.x);
      for (let i = 0; i < this.question.rows.length; i++) {
        if (!this.usersAnswers[i]) {
          return false;
        }
      }
    }
    return true;
  }
  /**
   * Saves changes from user input to question object
   */
  saveChanges() {
    this.question.usersAnswers = this.usersAnswers;
  }

  /**
   * Adds answer chosen by a user as a correct answer
   * @param i row coordinate in the matrix representing the possible answers (EMI table)
   * @param j col coordinate in the matrix representing the possible answers (EMI table)
   */
  onAnswerChanged(i: number, j: number) {
    this.deleteAnswerByRow(i);
    this.usersAnswers.push({x: i, y: j});
    this.contentChanged.emit({
      index: this.index,
      question: this.question
    });
  }

  /**
   * Deletes users (selected) answer in a given row
   * @param rowIndex index of a row in a matrix representing the EMI table
   */
  private deleteAnswerByRow(rowIndex: number) {
    const answerToDelete = this.usersAnswers.find(answer => answer.x === rowIndex);
    if (answerToDelete) {
      const indexOfAnswerToDelete = this.usersAnswers.indexOf(answerToDelete);
      if (indexOfAnswerToDelete > -1) {
        this.usersAnswers.splice(indexOfAnswerToDelete, 1);
      }
    }
  }
}
