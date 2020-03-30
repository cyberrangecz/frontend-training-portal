import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Pool} from 'kypo-sandbox-model';

export class SandboxPoolFormGroup {

  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      'poolSize': new FormControl(1,  [Validators.required, Validators.min(1), Validators.max(64)]),
      'sandboxDefinition': new FormControl(undefined, [Validators.required])
    })
  }

  createPoolFromValues(): Pool {
    const pool = new Pool();
    pool.definitionId = this.formGroup.get('sandboxDefinition').value?.id;
    pool.maxSize = this.formGroup.get('poolSize').value;
    return pool;
  }
}
