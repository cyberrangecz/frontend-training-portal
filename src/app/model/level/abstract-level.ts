/**
 * Parent class of all level types
 */
import {StepItem, StepperItemState} from 'kypo2-stepper';
import {AbstractLevelTypeEnum} from '../enums/abstract-level-type.enum';

export abstract class AbstractLevel implements StepItem {
  id: number;
  title: string;
  order: number;
  estimatedDuration: number;
  maxScore: number;
  icon: string;
  valid: boolean;
  type: AbstractLevelTypeEnum;
  isUnsaved: boolean;

  isActive: boolean;
  primaryIcon: string;
  state: StepperItemState;

  protected constructor() {
    this.isActive = false;
    this.state = new StepperItemState();
    this.state.hasState = false;
    this.valid = true;
  }
}
