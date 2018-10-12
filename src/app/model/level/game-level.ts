import {AbstractLevel} from "./abstract-level";
import {Hint} from "./hint";
import {AbstractLevelTypeEnum} from "../../enums/abstract-level-type.enum";

/**
 * Class representing level in a training of type Game
 */
export class GameLevel extends AbstractLevel {

  flag: string;
  hints: Hint[];
  content: string; // HTML
  solution: string; // HTML
  incorrectFlagCount: number = 0;
  incorrectFlagLimit: number = 5;
  solutionPenalized: boolean = true;
  estimatedDuration: number;
  attachments: string[];


  constructor() {
    super();
  }
}
