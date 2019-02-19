/**
 * Class representing hint in a training level.
 */
export class Hint {
  id: number;
  title: string;
  content: string; // HTML
  hintPenalty: number = 0;


  constructor() {
  }
}
