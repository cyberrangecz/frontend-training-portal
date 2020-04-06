import {FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Question} from 'kypo-training-model';
import {FreeFormQuestion} from 'kypo-training-model';
import { KypoValidators } from 'kypo-common';

/**
 * Form control for free form question component
 */
export class FreeFormQuestionFormGroup {
  formGroup: FormGroup;

  constructor(ffq: FreeFormQuestion) {
    this.formGroup = new FormGroup(
      {
        title: new FormControl(ffq.title, KypoValidators.noWhitespace),
        score: new FormControl(ffq.score, [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.min(0),
          Validators.max(Question.MAX_QUESTION_SCORE)
        ]),
        penalty: new FormControl(ffq.penalty, [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.min(0),
          Validators.max(Question.MAX_QUESTION_PENALTY)
        ]),
        answers: new FormArray(ffq.correctAnswers.map(answer => new FormControl(answer, KypoValidators.noWhitespace)))
      },
      this.noSelectedAnswers);
  }

  /**
   * Sets form input values to free form question object
   * @param ffq free form question to be filled with values
   * @param ffqIsValid true if free form question is valid, false otherwise
   * @param isTest true if level is test, false if questionnaire
   */
  setToFFQ(ffq: FreeFormQuestion, ffqIsValid: boolean, isTest: boolean) {
    ffq.title = this.formGroup.get('title').value;
    ffq.correctAnswers = this.formGroup.get('answers').value;
    ffq.score = ffq.required ? this.formGroup.get('score').value : 0;
    ffq.penalty = isTest ? this.formGroup.get('penalty').value : 0;
    ffq.valid = !isTest ? true : this.formGroup.valid && ffqIsValid;
  }

  private noSelectedAnswers: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    let error = null;
    const answers = control.get('answers');
    if (answers && answers.value.length === 0) {
      error = { noSelectedAnswers: true };
    }
    return error ? error : null;
  }

  /**
   * Adds validator to answers if preselected correct answers are required (if level is test)
   */
  addAnswersValidator() {
    this.formGroup.setValidators(this.noSelectedAnswers);
  }

  /**
   * Removes validators from answers if preselected correct answers are not required (if level is questionnaire)
   */
  removeAnswersValidator() {
    this.formGroup.clearValidators();
    this.formGroup.updateValueAndValidity();
  }
}
