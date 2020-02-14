/**
 * Class representing hint in a game training level.
 */
export class Hint {
  id: number;
  title: string;
  content: string;
  order: number;
  valid: boolean;
  penalty = 0;


  constructor() {
    this.valid = true;
  }

  hasContent(): boolean {
    return this.content !== null && this.content !== undefined;
  }

}
