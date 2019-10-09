import { FormControl, FormGroup, Validators } from '@angular/forms';
import {InfoLevel} from '../../../../../../model/level/info-level';

export class InfoLevelConfigFormGroup {

    formGroup: FormGroup;

    constructor(level: InfoLevel) {
        this.formGroup = new FormGroup({
            'title': new FormControl(level.title, Validators.required),
            'content': new FormControl(level.content, Validators.required)
        });
    }

    setToLevel(level: InfoLevel) {
      level.title = this.formGroup.get('title').value;
      level.content = this.formGroup.get('content').value;
      level.valid = this.formGroup.valid;
    }
}
