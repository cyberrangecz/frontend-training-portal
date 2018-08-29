/**
 * Abstract parent class of all possible types of questions
 */
export abstract class AbstractQuestion {
  id: number;
  title: string;

  score: number;
  penalty: number;
  required: boolean;


  protected constructor(title: string) {
    this.title = title;
    this.score = 0;
    this.penalty = 0;
  }

}
