import { FormGroup, FormControl, Validators } from "@angular/forms";

export class HintConfigurationFormGroup {
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      title: new FormControl("", Validators.required),
      content: new FormControl("", Validators.required),
      hintPenalty: new FormControl("", [
        Validators.required,
        Validators.min(0)
      ])
    });
  }
}
