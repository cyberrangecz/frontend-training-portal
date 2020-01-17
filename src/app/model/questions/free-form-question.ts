import {Question} from './question';

/**
 * One of types of questions. Has question and answer
 */
export class FreeFormQuestion extends Question {

  correctAnswers: string[];
  usersAnswer: string;

  constructor(title: string) {
    super(title);
    this.correctAnswers = [];
  }
}
