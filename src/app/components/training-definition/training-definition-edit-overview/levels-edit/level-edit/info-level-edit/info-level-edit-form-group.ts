import { FormControl, FormGroup, Validators } from '@angular/forms';
import {InfoLevel} from '../../../../../../model/level/info-level';

/**
 * Form control class for info level edit component
 */
export class InfoLevelEditFormGroup {

    formGroup: FormGroup;

    constructor(level: InfoLevel) {
        this.formGroup = new FormGroup({
            'title': new FormControl(level.title, Validators.required),
            'content': new FormControl(level.content, Validators.required)
        });
    }

  /**
   * Sets inserted form values from inputs to info level
   * @param level level which values should be filled
   */
  setToLevel(level: InfoLevel) {
      level.title = this.formGroup.get('title').value;
      level.content = this.formGroup.get('content').value;
      level.valid = this.formGroup.valid;
    }
}
