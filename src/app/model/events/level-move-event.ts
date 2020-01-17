import {Level} from '../level/level';
import {StepperStateChange} from 'kypo2-stepper/lib/component/stepper-state-change';

/**
 * Event representing change of position of a level in level stepper
 */
export class LevelMoveEvent {
  stepperStateChange: StepperStateChange;
  levels: Level[];

  constructor(stepperStateChange: StepperStateChange, levels: Level[]) {
    this.stepperStateChange = stepperStateChange;
    this.levels = levels;
  }
}
