import { FormGroup, FormControl, Validators } from '@angular/forms';

export class TraineeAccessTrainingFormGroup {

    formGroup: FormGroup;

    constructor() {
      const accessTokenPinLimitations = 4;
      this.formGroup = new FormGroup({
          'accessTokenPrefix': new FormControl('', Validators.required),
          'accessTokenPin': new FormControl('',
            [Validators.required,
              Validators.pattern('^[0-9]*$'),
              Validators.minLength(accessTokenPinLimitations),
              Validators.maxLength(accessTokenPinLimitations)])
      });
    }
}
