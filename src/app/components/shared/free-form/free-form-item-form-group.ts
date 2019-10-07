import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

export class FreeFormItemFormGroup {
  formGroup: FormGroup;

  constructor(ffi: string[], required: boolean) {
    this.formGroup = new FormGroup(
      {
        items: new FormArray(ffi.map(item => new FormControl(item, required ? Validators.required : undefined)))
      }
    );
  }
}
