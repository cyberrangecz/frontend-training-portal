import {AbstractQuestion} from "./abstract-question";

/**
 * One of types of questions. Has question and answer
 */
export class FreeFormQuestion extends AbstractQuestion {

  correctAnswers: string[];
  usersAnswer: string;

  constructor(title: string) {
    super(title);
  }
}
