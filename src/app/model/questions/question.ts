/**
 * Abstract parent class of all possible types of questions
 */

export abstract class Question {
  public static readonly MAX_QUESTION_SCORE = 100;
  public static readonly MAX_QUESTION_PENALTY = 100;

  id: number;
  title: string;
  order: number;
  score: number;
  penalty: number;
  required: boolean;
  valid: boolean;

  protected constructor(title: string) {
    this.valid = true;
    this.title = title;
    this.score = 0;
    this.penalty = 0;
  }
}
