import { FormControl, FormGroup, Validators } from '@angular/forms';

export class CloneDialogFormGroup {

    formGroup: FormGroup;

    constructor() {
        this.formGroup = new FormGroup({
            'clonedDefinitionTitle': new FormControl('', Validators.required)
        });
    }
}
