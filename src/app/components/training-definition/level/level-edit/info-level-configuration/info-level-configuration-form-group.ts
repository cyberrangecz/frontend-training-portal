import { FormGroup, Validators, FormControl } from "@angular/forms";

export class InfoLevelConfigFormGroup {

    formGroup: FormGroup;

    constructor() {
        this.formGroup = new FormGroup({
            'title': new FormControl('', Validators.required),
            'content': new FormControl('', Validators.required)
        })
    }
}
