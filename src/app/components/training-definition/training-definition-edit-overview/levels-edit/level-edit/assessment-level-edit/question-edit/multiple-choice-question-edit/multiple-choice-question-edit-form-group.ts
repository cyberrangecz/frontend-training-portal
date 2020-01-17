import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {Question} from '../../../../../../../../model/questions/question';
import {MultipleChoiceQuestion} from '../../../../../../../../model/questions/multiple-choice-question';

/**
 * Form control class for form in mcq edit component
 */
export class MultipleChoiceFormGroup {
  formGroup: FormGroup;
  private maxQuestionScore = Question.MAX_QUESTION_SCORE;
  private maxQuestionPenalty = Question.MAX_QUESTION_PENALTY;

  constructor(mcq: MultipleChoiceQuestion) {
    this.formGroup = new FormGroup({
      title: new FormControl(mcq.title, Validators.required),
      options: new FormArray(mcq.options.map(option => new FormControl(option, Validators.required)), Validators.required),
      correctAnswersIndices: new FormControl(mcq.correctAnswersIndices, Validators.required),
      score: new FormControl(mcq.score, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(0),
        Validators.max(this.maxQuestionScore)
      ]),
      penalty: new FormControl(mcq.penalty, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(0),
        Validators.max(this.maxQuestionPenalty)
      ])
    });
  }

  /**
   * Sets inserted input to multiple choice question object
   * @param mcq object to be filled with form inputs
   * @param isTest true if level is test, false if questionnaire
   */
  setToMCQ(mcq: MultipleChoiceQuestion, isTest: boolean) {
    mcq.title = this.formGroup.get('title').value;
    mcq.correctAnswersIndices = this.formGroup.get('correctAnswersIndices').value;
    mcq.options = this.formGroup.get('options').value;
    mcq.score = mcq.required ? this.formGroup.get('score').value : 0;
    mcq.penalty = isTest ? this.formGroup.get('penalty').value : 0;
    mcq.valid = this.formGroup.valid;
  }

  /**
   * Adds validators to check whether correct answers were predefined if level is test
   */
  addAnswersValidator() {
    this.formGroup
      .get('correctAnswersIndices')
      .setValidators(Validators.required);
    this.formGroup.get('correctAnswersIndices').updateValueAndValidity();
  }

  /**
   * Removes correct answers validators if level is questionnaire
   */
  removeAnswersValidator() {
    this.formGroup.get('correctAnswersIndices').clearValidators();
    this.formGroup.get('correctAnswersIndices').updateValueAndValidity();
  }
}
