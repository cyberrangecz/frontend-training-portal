import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractQuestion} from "../../../../../../../model/questions/abstract-question";
import {MultipleChoiceQuestion} from "../../../../../../../model/questions/multiple-choice-question";
import {MatCheckboxChange} from "@angular/material";

@Component({
  selector: 'trainee-multiple-choice-question',
  templateUrl: './multiple-choice-question-trainee.component.html',
  styleUrls: ['./multiple-choice-question-trainee.component.css']
})
/**
 * Component displaying MCQ type of question in the assessment level of a trainees training run
 */
export class MultipleChoiceQuestionTraineeComponent implements OnInit {

  @Input('question') question: MultipleChoiceQuestion;
  @Input('index') index: number;

  answersIndexes: number[] = [];

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
   * Adds correct answer
   * @param index index of the answer which should be marked as correct
   */
  private addCorrectAnswer(index: number) {
    this.answersIndexes.push(index);
  }

  /**
   * Removes given answer from correct answers
   * @param index index of the answer which should be deleted
   */
  private removeCorrectAnswer(index: number) {
    const indexToRemove = this.answersIndexes.indexOf(index);
    if (indexToRemove != -1) {
      this.answersIndexes.splice(indexToRemove, 1);
    }
  }

  /**
   * Sets values from user input to the question objects
   */
  private setInputValues() {
    this.question.usersAnswersIndexes = this.answersIndexes;
  }

  /**
   * Validates user input. Call alert service if there are any errors
   */
  private validateInput() {

  }

}
