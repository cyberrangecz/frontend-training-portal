import {AbstractLevel} from "./abstract-level";
import {Hint} from "./hint";
import {TrainingDefinition} from "../training/training-definition";

export class GameLevel extends AbstractLevel {

  flag: string;
  hints: Hint[];
  content: Blob; // HTML
  solution: Blob; // HTML
  incorrectFlagPenalty: number = 0;
  solutionPenalty: number = this.maxScore - 1;
  estimatedDuration: number;
  attachments: string[];


  constructor(trainingDefinitionId: number, title: string, maxScore: number, order: number, preHook: Blob, postHook: Blob, flag: string, hints: Hint[], content: Blob, solution: Blob, incorrectFlagPenalty: number, solutionPenalty: number) {
    super(trainingDefinitionId, title, maxScore, order, preHook, postHook);
    this.flag = flag;
    this.hints = hints;
    this.content = content;
    this.solution = solution;
    this.incorrectFlagPenalty = incorrectFlagPenalty;
    this.solutionPenalty = solutionPenalty;
  }
}
