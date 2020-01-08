import { FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * Sandbox Definition create form
 */
export class SandboxDefinitionFormGroup {

    formGroup: FormGroup;

    constructor() {
        this.formGroup = new FormGroup({
            'gitlabUrl': new FormControl('', Validators.required),
            'revision': new FormControl('', Validators.required)
        });
    }
}
