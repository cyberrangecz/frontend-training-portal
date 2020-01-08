import {AbstractLevel} from '../level/abstract-level';
import {StepperStateChange} from 'kypo2-stepper/lib/component/stepper-state-change';

/**
 * Event representing change of position of a level in level stepper
 */
export class LevelMoveEvent {
  stepperStateChange: StepperStateChange;
  levels: AbstractLevel[];

  constructor(stepperStateChange: StepperStateChange, levels: AbstractLevel[]) {
    this.stepperStateChange = stepperStateChange;
    this.levels = levels;
  }
}
