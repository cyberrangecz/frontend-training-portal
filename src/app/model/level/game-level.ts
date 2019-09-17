import {AbstractLevel} from './abstract-level';
import {Hint} from './hint';

/**
 * Class representing level in a training of type Game
 */
export class GameLevel extends AbstractLevel {

  flag: string;
  hints: Hint[];
  content: string;
  solution: string;
  incorrectFlagLimit = 5;
  solutionPenalized = true;
  attachments: string[] = [];

  constructor() {
    super();
    this.icon = 'videogame_asset';
    this.hints = [];
  }

  hasSolution(): boolean {
    return this.solution !== null && this.solution !== undefined;
  }
}
