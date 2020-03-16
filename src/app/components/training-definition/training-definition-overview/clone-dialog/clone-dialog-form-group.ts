import {FormControl, FormGroup} from '@angular/forms';
import {KypoValidators} from 'kypo-common';

/**
 * Form group controls for form in clone dialog component
 */
export class CloneDialogFormGroup {

    formGroup: FormGroup;

    constructor() {
        this.formGroup = new FormGroup({
            'clonedDefinitionTitle': new FormControl('', [KypoValidators.noWhitespace])
        });
    }
}
