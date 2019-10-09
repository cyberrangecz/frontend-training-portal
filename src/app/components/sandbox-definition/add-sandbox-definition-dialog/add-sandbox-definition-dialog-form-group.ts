import { FormControl, FormGroup, Validators } from '@angular/forms';

export class SandboxDefinitionFormGroup {

    formGroup: FormGroup;

    constructor() {
        this.formGroup = new FormGroup({
            'gitlabUrl': new FormControl('', Validators.required),
            'revision': new FormControl('', Validators.required)
        });
    }
}
