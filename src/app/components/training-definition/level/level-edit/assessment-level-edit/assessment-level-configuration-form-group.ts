import { FormGroup, FormControl, Validators } from '@angular/forms';

export class AssessmentLevelConfigurationFormGroup {

    formGroup: FormGroup;

    constructor() {
        this.formGroup = new FormGroup({
            'title': new FormControl('', Validators.required),
            'instructions': new FormControl(''),
            'isTest': new FormControl(''),
            'estimatedDuration': new FormControl('', [Validators.max(60), Validators.min(1)]),
            'questions': new FormControl(''),

        });
    }
}
