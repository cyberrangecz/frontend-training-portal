import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

export class FreeFormQuestionFormGroup {
  formGroup: FormGroup;
  private maxQuestionScore: number;
  private maxQuestionPenalty: number;

  constructor(maxQuestionScore: number, maxQuestionPenalty: number) {
    this.maxQuestionPenalty = maxQuestionPenalty;
    this.maxQuestionScore = maxQuestionScore;
    this.formGroup = new FormGroup(
      {
        title: new FormControl('', Validators.required),
        answers: new FormArray([]),
        score: new FormControl('', [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.min(0),
          Validators.max(this.maxQuestionScore)
        ]),
        penalty: new FormControl('', [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.min(0),
          Validators.max(this.maxQuestionPenalty)
        ])
      },
      { validators: this.noSelectedAnswers }
    );
  }

  private noSelectedAnswers: ValidatorFn = (
    control: FormGroup
  ): ValidationErrors | null => {
    let error = null;
    const answers = control.get('answers');
    if (answers && answers.value.length == 0) {
      error = { noSelectedAnswers: true };
    }

    return error ? error : null;
  }

  addAnswersValidator() {
    this.formGroup.setValidators(this.noSelectedAnswers);
  }

  removeAnswersValidator() {
    this.formGroup.clearValidators();
  }
}
