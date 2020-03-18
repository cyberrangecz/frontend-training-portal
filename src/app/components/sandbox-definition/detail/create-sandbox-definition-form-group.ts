import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SandboxDefinitionCreateInfo} from '../../../model/sandbox/definition/sandbox-definition-create-info';

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

    createFromValues(): SandboxDefinitionCreateInfo {
      return new SandboxDefinitionCreateInfo(
        this.formGroup.get('gitlabUrl').value,
        this.formGroup.get('revision').value)
    }
}
