/**
 * Class representing hint button in a training level.
 */
import {Hint} from './hint';

export class HintButton {
  displayed: boolean;
  hint: Hint;

  constructor(displayed: boolean, hint: Hint) {
    this.displayed = displayed;
    this.hint = hint;
  }
}
