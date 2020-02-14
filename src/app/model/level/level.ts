/**
 * Parent class of all level types
 */
import {AbstractLevelTypeEnum} from '../enums/abstract-level-type.enum';

export abstract class Level {
  id: number;
  title: string;
  order: number;
  estimatedDuration: number;
  maxScore: number;
  valid: boolean;
  type: AbstractLevelTypeEnum;
  isUnsaved: boolean;

  protected constructor() {
    this.valid = true;
  }
}
