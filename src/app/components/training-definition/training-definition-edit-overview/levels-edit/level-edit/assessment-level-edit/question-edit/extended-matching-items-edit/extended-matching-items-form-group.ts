import {
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {AbstractQuestion} from '../../../../../../../../model/questions/abstract-question';
import {ExtendedMatchingItems} from '../../../../../../../../model/questions/extended-matching-items';

/**
 * Form control group for form in EMI edit component
 */
export class ExtendedMatchingItemsFormGroup {
  formGroup: FormGroup;

  constructor(emi: ExtendedMatchingItems) {
    this.formGroup = new FormGroup(
      {
        title: new FormControl(emi.title, Validators.required),
        rows: new FormArray(emi.rows.map(row => new FormControl(row, Validators.required))),
        cols: new FormArray(emi.cols.map(col => new FormControl(col, Validators.required))),
        correctAnswers: new FormArray(emi.correctAnswers.map(answer => new FormControl(answer))),
        score: new FormControl(emi.score, [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.min(0),
          Validators.max(AbstractQuestion.MAX_QUESTION_SCORE)
        ]),
        penalty: new FormControl(emi.penalty, [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.min(0),
          Validators.max(AbstractQuestion.MAX_QUESTION_PENALTY)
        ]),
      },
    this.noSelectedAnswers);
  }

  /**
   * Sets inserted input values to emi object
   * @param emi emi object to be filled with inserted inputs
   * @param isTest true if level is test, false if questionnaire
   */
  setToEMI(emi: ExtendedMatchingItems, isTest: boolean) {
    emi.title = this.formGroup.get('title').value;
    emi.rows = this.formGroup.get('rows').value;
    emi.cols = this.formGroup.get('cols').value;
    emi.correctAnswers = this.formGroup.get('correctAnswers').value;
    emi.score = emi.required ? this.formGroup.get('score').value : 0;
    emi.penalty = isTest ? this.formGroup.get('penalty').value : 0;
    emi.valid = this.formGroup.valid;
  }

  private noSelectedAnswers: ValidatorFn = (
    control: FormGroup
  ): ValidationErrors | null => {
    let error = null;
    const correctAnswers = control.get('correctAnswers');
    const rows = control.get('rows');
    if (correctAnswers.value.length !== rows.value.length) {
      error = { noSelectedAnswers: true };
    }
    return error ? error : null;
  }

  /**
   * Adds correct answers validators (if level is test)
   */
  addAnswersValidator() {
    this.formGroup.setValidators(this.noSelectedAnswers);
  }

  /**
   * Removes correct answers validators (if level is questionnaire)
   */
  removeAnswersValidator() {
    this.formGroup.clearValidators();
    this.formGroup.updateValueAndValidity();
  }
}
