/**
 * Parent class of all level types. Can't be instantiated
 */
import {AbstractLevelTypeEnum} from "../../enums/abstract-level-type.enum";

export abstract class AbstractLevel {
  id: number;
  title: string;
  nextLevel: number;
  maxScore: number;
  preHook: string;
  postHook: string;

  // custom attribute for displaying icons customized to level type
  type: AbstractLevelTypeEnum;
}
