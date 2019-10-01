import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
import {AbstractQuestion} from '../../../../../../../../model/questions/abstract-question';
import {MultipleChoiceQuestion} from '../../../../../../../../model/questions/multiple-choice-question';

export class MultipleChoiceFormGroup {
  formGroup: FormGroup;
  private maxQuestionScore = AbstractQuestion.MAX_QUESTION_SCORE;
  private maxQuestionPenalty = AbstractQuestion.MAX_QUESTION_PENALTY;

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

  setToMCQ(mcq: MultipleChoiceQuestion, isTest: boolean) {
    mcq.title = this.formGroup.get('title').value;
    mcq.correctAnswersIndices = this.formGroup.get('correctAnswersIndices').value;
    mcq.options = this.formGroup.get('options').value;
    mcq.score = mcq.required ? this.formGroup.get('score').value : 0;
    mcq.penalty = isTest ? this.formGroup.get('penalty').value : 0;
    mcq.valid = this.formGroup.valid;
  }

  addAnswersValidator() {
    this.formGroup
      .get('correctAnswersIndices')
      .setValidators(Validators.required);
    this.formGroup.get('correctAnswersIndices').updateValueAndValidity();
  }

  removeAnswersValidator() {
    this.formGroup.get('correctAnswersIndices').clearValidators();
    this.formGroup.get('correctAnswersIndices').updateValueAndValidity();
  }
}
