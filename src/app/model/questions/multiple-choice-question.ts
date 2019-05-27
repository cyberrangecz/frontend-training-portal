import {AbstractQuestion} from "./abstract-question";

/**
 * One of types of questions in questionnaire. Traditional multiple-choice
 */
export class MultipleChoiceQuestion extends AbstractQuestion {
  options: string[];
  correctAnswersIndices: number[];
  usersAnswersIndices: number[];

  constructor(title: string) {
    super(title);
    this.options = [];
    this.correctAnswersIndices = [];
    this.usersAnswersIndices = [];
  }
}
