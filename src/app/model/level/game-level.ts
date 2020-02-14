import {Level} from './level';
import {Hint} from './hint';

/**
 * Class representing level in a training of type Game
 */
export class GameLevel extends Level {

  flag: string;
  hints: Hint[];
  content: string;
  solution: string;
  incorrectFlagLimit = 5;
  solutionPenalized = true;

  constructor() {
    super();
    this.hints = [];
  }

  hasSolution(): boolean {
    return this.solution !== null && this.solution !== undefined;
  }
}
