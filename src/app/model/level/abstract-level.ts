/**
 * Parent class of all level types. Can't be instantiated
 */
import {AbstractLevelTypeEnum} from '../enums/abstract-level-type.enum';
import {AbstractStepItem} from 'kypo2-stepper';

export abstract class AbstractLevel extends AbstractStepItem {
  id: number;
  title: string;
  order: number;
  estimatedDuration: number;
  maxScore: number;
  icon: string;
  // custom attribute for displaying icons customized to level type
  type: AbstractLevelTypeEnum;

}
