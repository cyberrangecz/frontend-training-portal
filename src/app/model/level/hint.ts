/**
 * Class representing hint in a training level.
 */
export class Hint {
  id: number;
  title: string;
  content: string;
  hintPenalty: number = 0;

  constructor() {
  }

  hasContent(): boolean {
    return this.content !== null && this.content !== undefined;
  }
}
