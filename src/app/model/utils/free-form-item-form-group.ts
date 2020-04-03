import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { KypoValidators } from 'kypo-common';

/**
 * Group of inputs for free form component
 */
export class FreeFormItemFormGroup {
  formGroup: FormGroup;

  constructor(ffi: string[], required: boolean) {
    this.formGroup = new FormGroup(
      {
        items: new FormArray(ffi.map(item => new FormControl(item, required ? KypoValidators.noWhitespace : undefined)))
      }
    );
  }
}
