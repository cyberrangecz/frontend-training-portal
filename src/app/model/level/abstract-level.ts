/**
 * Parent class of all level types. Can't be instantiated
 */
import {AbstractLevelTypeEnum} from "../../enums/abstract-level-type.enum";

export abstract class AbstractLevel {
  id: number;
  title: string;
  order: number;
  nextLevelId: number;
  estimatedDuration: number;
  maxScore: number;
  preHook: string;
  postHook: string;

  // custom attribute for displaying icons customized to level type
  type: AbstractLevelTypeEnum;

  hasNextLevel(): boolean {
    return this.nextLevelId !== undefined && this.nextLevelId !== null;
  }
}
