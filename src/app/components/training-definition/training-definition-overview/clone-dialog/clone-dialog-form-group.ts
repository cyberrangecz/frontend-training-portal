import {FormControl, FormGroup, Validators} from '@angular/forms';
import {KypoValidators} from '../../../../model/validators/kypo-validators';

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
