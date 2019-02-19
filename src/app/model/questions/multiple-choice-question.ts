import {AbstractQuestion} from "./abstract-question";

/**
 * One of types of questions in questionnaire. Traditional multiple-choice
 */
export class MultipleChoiceQuestion extends AbstractQuestion {
  options: string[];
  correctAnswersIndexes: number[];
  usersAnswersIndexes: number[];

  constructor(title: string) {
    super(title);
    this.options = [];
    this.correctAnswersIndexes = [];
    this.usersAnswersIndexes = [];
  }
}
