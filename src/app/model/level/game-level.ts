import {AbstractLevel} from "./abstract-level";
import {Hint} from "./hint";

/**
 * Class representing level in a training of type Game
 */
export class GameLevel extends AbstractLevel {

  flag: string;
  hints: Hint[] = [];
  content: string;
  solution: string;
  incorrectFlagLimit: number = 5;
  solutionPenalized: boolean = true;
  estimatedDuration: number;
  attachments: string[] = [];

  constructor() {
    super();
  }
}
