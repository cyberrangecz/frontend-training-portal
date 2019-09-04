/**
 * Class representing hint in a training level.
 */
import {AbstractStepItem} from 'kypo2-stepper';

export class Hint extends AbstractStepItem {
  id: number;
  title: string;
  content: string;
  order: number;
  isValid: boolean;
  hintPenalty: number = 0;

  constructor() {
    super();
  }

  hasContent(): boolean {
    return this.content !== null && this.content !== undefined;
  }
}
