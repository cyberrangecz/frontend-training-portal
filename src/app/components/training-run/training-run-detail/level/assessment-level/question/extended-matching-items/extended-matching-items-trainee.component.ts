import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../../../../../../model/questions/question';
import {ExtendedMatchingItems} from '../../../../../../../model/questions/extended-matching-items';
import {BaseComponent} from '../../../../../../base.component';

@Component({
  selector: 'kypo2-trainee-extended-matching-items',
  templateUrl: './extended-matching-items-trainee.component.html',
  styleUrls: ['./extended-matching-items-trainee.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Component displaying EMI type of question in the assessment level of a trainees training run.
 * If assessment is type of test or question is required, user needs to answer it, otherwise it is optional.
 */
export class ExtendedMatchingItemsTraineeComponent extends BaseComponent implements OnInit {

  @Input() question: ExtendedMatchingItems;
  @Input() index: number;

  @Output() contentChanged: EventEmitter<{index: number, question: Question}> = new EventEmitter();

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
