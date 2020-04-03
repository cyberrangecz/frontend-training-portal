import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Hint} from '../../../../../../../../model/level/hint';
import { KypoValidators } from 'kypo-common';

/**
 * Form control for hint edit component
 */
export class HintEditFormGroup {
  formGroup: FormGroup;

  constructor(hint: Hint) {
    this.formGroup = new FormGroup({
      title: new FormControl(hint.title, KypoValidators.noWhitespace),
      content: new FormControl(hint.content, KypoValidators.noWhitespace),
      hintPenalty: new FormControl(hint.penalty, [
        Validators.required,
        Validators.min(0)
      ])
    });
  }

  /**
   * Sets inserted values from form inputs to hint object
   * @param hint hint to be filled with form inputs
   */
  setToHint(hint: Hint) {
    hint.title = this.formGroup.get('title').value;
    hint.content = this.formGroup.get('content').value;
    hint.penalty = this.formGroup.get('hintPenalty').value;
    hint.valid = this.formGroup.valid;
  }
}
