import {StepperStateChange} from 'kypo2-stepper/lib/component/stepper-state-change';

/**
 * Event representing change of position of a level in level stepper
 */
export class LevelMoveEvent {
  stepperStateChange: StepperStateChange;

  constructor(stepperStateChange: StepperStateChange) {
    this.stepperStateChange = stepperStateChange;
  }
}
