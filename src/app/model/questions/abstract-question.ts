import {QuestionTypeEnum} from "../../enums/question-type.enum";

/**
 * Abstract parent class of all possible types of questions
 */
export abstract class AbstractQuestion {
  id: number;
  type: QuestionTypeEnum;
  title: string;

  protected constructor(title: string) {
    this.title = title;
  }

}
