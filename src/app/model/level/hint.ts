/**
 * Class representing hint in a training level.
 */
import {AbstractStepItem} from 'kypo2-stepper';

export class Hint extends AbstractStepItem {
  id: number;
  title: string;
  content: string;
  order: number;
  valid: boolean;
  penalty = 0;

  constructor() {
    super();
    this.valid = true;
    this.isSaved = true; // TODO: REMOVE as hint should not be saved separatedly of level
    this.icon = 'help_outline';

  }

  hasContent(): boolean {
    return this.content !== null && this.content !== undefined;
  }
}
