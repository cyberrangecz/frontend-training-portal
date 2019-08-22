import { FormGroup, Validators, FormControl } from "@angular/forms";

export class SandboxDefinitionFormGroup{

    formGroup: FormGroup;

    constructor(){
        this.formGroup = new FormGroup({
            'gitlabUrl': new FormControl('', Validators.required),
            'revision': new FormControl('',Validators.required)
        })
    }

    get gitlabUrl(){return this.formGroup.get('gitlabUrl')}
    get revision(){return this.formGroup.get('revision')}
}