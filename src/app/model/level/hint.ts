/**
 * Class representing hint in a game training level.
 */
import {StepItem, StepperItemState} from 'kypo2-stepper';

export class Hint implements StepItem {
  id: number;
  title: string;
  content: string;
  order: number;
  valid: boolean;
  penalty = 0;

  isActive: boolean;
  primaryIcon: string;
  state: StepperItemState;

  constructor() {
    this.valid = true;
    this.state = new StepperItemState();
    this.state.icon = 'help_outline';
    this.state.hasState = false; // TODO: REMOVE as hint should not be saved separatedly of level
    this.primaryIcon = 'help_outline';
  }

  hasContent(): boolean {
    return this.content !== null && this.content !== undefined;
  }

}
