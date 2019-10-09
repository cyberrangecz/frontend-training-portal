/**
 * Parent class of all level types. Can't be instantiated
 */
import {AbstractStepItem} from 'kypo2-stepper';
import {AbstractLevelTypeEnum} from '../enums/abstract-level-type.enum';

export abstract class AbstractLevel extends AbstractStepItem {
  id: number;
  title: string;
  order: number;
  estimatedDuration: number;
  maxScore: number;
  icon: string;
  valid: boolean ;
  // custom attribute for displaying icons customized to level type
  type: AbstractLevelTypeEnum;

  protected constructor() {
    super();
    this.isActive = false;
    this.isSaved = true;
    this.valid = true;
  }
}
