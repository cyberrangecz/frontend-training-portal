import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SandboxDefinition} from 'kypo-sandbox-model';

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

    createFromValues(): SandboxDefinition {
      const definition = new SandboxDefinition();
      definition.url = this.formGroup.get('gitlabUrl').value;
      definition.rev =  this.formGroup.get('revision').value;
      return definition;
    }
}
