import { FormGroup, FormControl, Validators } from '@angular/forms';

export class TraineeAccessTrainingFormGroup {

    formGroup: FormGroup;

    constructor() {
        this.formGroup = new FormGroup({
            'accessTokenPrefix': new FormControl('', Validators.required),
            'accessTokenPin': new FormControl('',
              [Validators.required,
                Validators.pattern('^[0-9]*$'),
                Validators.minLength(4),
                Validators.maxLength(4)])
        });
    }
}
