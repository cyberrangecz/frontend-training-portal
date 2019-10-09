import {
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {AbstractQuestion} from '../../../../../../../../model/questions/abstract-question';
import {FreeFormQuestion} from '../../../../../../../../model/questions/free-form-question';

export class FreeFormQuestionFormGroup {
  formGroup: FormGroup;

  constructor(ffq: FreeFormQuestion) {
    this.formGroup = new FormGroup(
      {
        title: new FormControl(ffq.title, Validators.required),
        score: new FormControl(ffq.score, [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.min(0),
          Validators.max(AbstractQuestion.MAX_QUESTION_SCORE)
        ]),
        penalty: new FormControl(ffq.penalty, [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.min(0),
          Validators.max(AbstractQuestion.MAX_QUESTION_PENALTY)
        ]),
        answers: new FormArray(ffq.correctAnswers.map(answer => new FormControl(answer, Validators.required)))
      },
      this.noSelectedAnswers);
  }

  setToFFQ(ffq: FreeFormQuestion, freeFromValid: boolean, isTest: boolean) {
    ffq.title = this.formGroup.get('title').value;
    ffq.correctAnswers = this.formGroup.get('answers').value;
    ffq.score = ffq.required ? this.formGroup.get('score').value : 0;
    ffq.penalty = isTest ? this.formGroup.get('penalty').value : 0;
    ffq.valid = !isTest ? true : this.formGroup.valid && freeFromValid;
  }

  private noSelectedAnswers: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    let error = null;
    const answers = control.get('answers');
    if (answers && answers.value.length === 0) {
      error = { noSelectedAnswers: true };
    }
    return error ? error : null;
  }

  addAnswersValidator() {
    this.formGroup.setValidators(this.noSelectedAnswers);
  }

  removeAnswersValidator() {
    this.formGroup.clearValidators();
    this.formGroup.updateValueAndValidity();
  }
}
