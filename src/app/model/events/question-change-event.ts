import {AbstractQuestion} from '../questions/abstract-question';

export class QuestionChangeEvent {
  question: AbstractQuestion;
  index: number;

  constructor(question: AbstractQuestion, index: number) {
    this.question = question;
    this.index = index;
  }
}
