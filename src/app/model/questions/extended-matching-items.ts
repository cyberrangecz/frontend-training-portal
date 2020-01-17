import {Question} from './question';

/**
 * One of the question types used in questionnaires. Has an ordered list of rows and columns and matching correct answers.
 * Type of question:
 *            answer1    answer2    answer3
 * question1    O           O          X
 * question2    O           X          O
 * question3    X           X          O
 *
 */
export class ExtendedMatchingItems extends Question {

  rows: string[];
  cols: string[];

  correctAnswers: {
    x: number,
    y: number
  }[];

  usersAnswers: {
    x: number,
    y: number
  }[];

  constructor(title: string) {
    super(title);
    this.rows = [];
    this.cols = [];
    this.correctAnswers = [];
    this.usersAnswers = [];
  }
}
