/**
 * Class representing hint in a training level.
 */
export class Hint {
  id: number;
  gameLevelId: number;
  title: string;
  content: Blob; // HTML
  hintPenalty: number = 0;


  constructor(title: string, content: Blob, hintPenalty: number) {
    this.title = title;
    this.content = content;
    this.hintPenalty = hintPenalty;
  }
}
