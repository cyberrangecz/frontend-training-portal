import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ExtendedMatchingItems} from "../../../../../../../model/questions/extended-matching-items";

@Component({
  selector: 'trainee-extended-matching-items',
  templateUrl: './extended-matching-items-trainee.component.html',
  styleUrls: ['./extended-matching-items-trainee.component.css']
})
/**
 * Component displaying EMI type of question in the assessment level of a trainees training run
 */
export class ExtendedMatchingItemsTraineeComponent implements OnInit {

  @Input('question') question: ExtendedMatchingItems;
  @Input('index') index: number;

  usersAnswers: {x: number, y: number}[] = [];

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
    this.question.usersAnswers = this.usersAnswers;
  }

  /**
   * Validates user input. Call alert service if there are any errors
   */
  private validateInput() {

  }

}
