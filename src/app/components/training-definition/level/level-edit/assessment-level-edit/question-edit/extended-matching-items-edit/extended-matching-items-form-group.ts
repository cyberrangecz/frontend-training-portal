import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  ValidatorFn,
  ValidationErrors
} from '@angular/forms';

export class ExtendedMatchingItemsFormGroup {
  formGroup: FormGroup;
  private maxQuestionScore: number;
  private maxQuestionPenalty: number;

  constructor(maxQuestionScore: number, maxQuestionPenalty: number) {
    this.maxQuestionPenalty = maxQuestionPenalty;
    this.maxQuestionScore = maxQuestionScore;
    this.formGroup = new FormGroup(
      {
        title: new FormControl('', Validators.required),
        rows: new FormArray([], Validators.required),
        cols: new FormArray([], Validators.required),
        correctAnswers: new FormArray([]),
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
    const correctAnswers = control.get('correctAnswers');
    const rows = control.get('rows');
    if (correctAnswers.value.length != rows.value.length) {
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
