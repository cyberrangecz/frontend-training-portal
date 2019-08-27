/**
 * Class representing hint in a training level.
 */
export class Hint {
  id: number;
  title: string;
  content: string;
  order: number;
  hintPenalty: number = 0;

  constructor() {
  }

  hasContent(): boolean {
    return this.content !== null && this.content !== undefined;
  }
}
