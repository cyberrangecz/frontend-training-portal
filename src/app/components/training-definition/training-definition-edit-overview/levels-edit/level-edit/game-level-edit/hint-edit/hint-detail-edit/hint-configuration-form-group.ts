import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Hint} from '../../../../../../../../model/level/hint';

export class HintConfigurationFormGroup {
  formGroup: FormGroup;

  constructor(hint: Hint) {
    this.formGroup = new FormGroup({
      title: new FormControl(hint.title, Validators.required),
      content: new FormControl(hint.content, Validators.required),
      hintPenalty: new FormControl(hint.penalty, [
        Validators.required,
        Validators.min(0)
      ])
    });
  }

  setToHint(hint: Hint) {
    hint.title = this.formGroup.get('title').value;
    hint.content = this.formGroup.get('content').value;
    hint.penalty = this.formGroup.get('hintPenalty').value;
    hint.valid = this.formGroup.valid;
  }
}
