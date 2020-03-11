/**
 * Class representing hint button in a training level.
 */
import {Hint} from './hint';
import {BehaviorSubject, Observable} from 'rxjs';

export class HintButton {

  private disabledSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  disabled$: Observable<boolean> = this.disabledSubject$.asObservable();
  hint: Hint;

  constructor(disabled: boolean, hint: Hint) {
    this.disabledSubject$.next(disabled);
    this.hint = hint;
  }

  disable() {
    this.disabledSubject$.next(true);
  }

  enable() {
    this.disabledSubject$.next(false);
  }
}
