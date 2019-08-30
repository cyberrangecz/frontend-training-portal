import { FormGroup, FormArray } from "@angular/forms";

export class HintStepperFormGroup {
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      hints: new FormArray([])
    });
  }
}
