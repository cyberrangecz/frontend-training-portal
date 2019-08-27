import {FormControl, FormGroup, Validators} from '@angular/forms';

export class AllocationModalFormGroup {
  formGroup: FormGroup;

  constructor(max: number) {
    this.formGroup = new FormGroup({
      'allocationSize': new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1), Validators.max(max)])
    });
  }
}
