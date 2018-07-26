import {AbstractLevel} from "./abstract-level";
import {LevelTypeEnum} from "../../enums/level-type.enum";

/**
 * Class representing single level in a training of type Info
 */
export class InfoLevel extends AbstractLevel {
  content: string; // HTML -> use string?


  constructor(trainingDefinitionId: number, title: string, maxScore: number, order: number, preHook: string, postHook: string, content: string) {
    super(trainingDefinitionId, title, maxScore, order, preHook, postHook, LevelTypeEnum.Info);
    this.content = content;
  }
}
