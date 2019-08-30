import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  ValidatorFn,
  ValidationErrors
} from "@angular/forms";

export class MultipleChoiceFormGroup {
  formGroup: FormGroup;
  private maxQuestionScore: number;
  private maxQuestionPenalty: number;

  constructor(maxQuestionScore: number, maxQuestionPenalty: number) {
    this.maxQuestionPenalty = maxQuestionPenalty;
    this.maxQuestionScore = maxQuestionScore;
    this.formGroup = new FormGroup({
      title: new FormControl("", Validators.required),
      options: new FormArray([], Validators.required),
      correctAnswersIndices: new FormControl([], Validators.required),
      score: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.min(0),
        Validators.max(this.maxQuestionScore)
      ]),
      penalty: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.min(0),
        Validators.max(this.maxQuestionPenalty)
      ])
    });
  }

  addAnswersValidator() {
    this.formGroup
      .get("correctAnswersIndices")
      .setValidators(Validators.required);
    this.formGroup.get("correctAnswersIndices").updateValueAndValidity();
  }

  removeAnswersValidator() {
    this.formGroup.get("correctAnswersIndices").clearValidators();
    this.formGroup.get("correctAnswersIndices").updateValueAndValidity();
  }
}
