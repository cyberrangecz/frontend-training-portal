import { FormGroup, FormControl, Validators } from '@angular/forms';

export class GameLevelEditFormGroup {
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      solution: new FormControl('', Validators.required),
      maxScore: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(0),
        Validators.max(100)
      ]),
      solutionPenalized: new FormControl(''),
      incorrectFlagLimit: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(1),
        Validators.max(100)
      ]),
      flag: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      estimatedDuration: new FormControl('', [
        Validators.pattern('^[0-9]*$'),
        Validators.min(1),
        Validators.max(60)
      ]),
      hints: new FormControl([])
    });
  }
}
