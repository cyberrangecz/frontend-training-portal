import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SandboxPool} from '../../../model/sandbox/pool/sandbox-pool';

export class SandboxPoolFormGroup {

  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      'poolSize': new FormControl(1,  [Validators.required, Validators.min(1), Validators.max(64)]),
      'sandboxDefinition': new FormControl(undefined, [Validators.required])
    })
  }

  createPoolFromValues(): SandboxPool {
    const pool = new SandboxPool();
    pool.definitionId = this.formGroup.get('sandboxDefinition').value?.id;
    pool.maxSize = this.formGroup.get('poolSize').value;
    return pool;
  }
}
