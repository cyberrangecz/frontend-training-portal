import {AbstractLevel} from "./abstract-level";
import {Hint} from "./hint";
import {LevelTypeEnum} from "../../enums/level-type.enum";

/**
 * Class representing level in a training of type Game
 */
export class GameLevel extends AbstractLevel {

  flag: string;
  hints: Hint[];
  content: string; // HTML
  solution: string; // HTML
  incorrectFlagPenalty: number = 0;
  solutionPenalty: number = this.maxScore - 1;
  estimatedDuration: number;
  attachments: string[];


  constructor(trainingDefinitionId: number, title: string, maxScore: number, order: number, preHook: string, postHook: string, flag: string, hints: Hint[], content: string, solution: string, incorrectFlagPenalty: number, solutionPenalty: number) {
    super(trainingDefinitionId, title, maxScore, order, preHook, postHook, LevelTypeEnum.Game);
    this.flag = flag;
    this.hints = hints;
    this.content = content;
    this.solution = solution;
    this.incorrectFlagPenalty = incorrectFlagPenalty;
    this.solutionPenalty = solutionPenalty;
  }
}
