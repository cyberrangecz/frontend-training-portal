import { FormGroup, Validators, FormControl } from '@angular/forms';

export class TrainingDefinitionEditFormGroup {
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      prerequisites: new FormControl(''),
      outcomes: new FormControl(''),
      authors: new FormControl('', Validators.required),
      sandboxDefId: new FormControl('', Validators.required),
      showProgress: new FormControl(''),
      betaTestingGroup: new FormControl('')
    });
  }
}
