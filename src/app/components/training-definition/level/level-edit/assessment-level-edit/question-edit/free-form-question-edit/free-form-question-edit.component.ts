import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FreeFormQuestion} from '../../../../../../../model/questions/free-form-question';
import {AlertService} from '../../../../../../../services/shared/alert.service';
import {BaseComponent} from '../../../../../../base.component';
import { FreeFormQuestionFormGroup } from './free-form-question-form-group';
import { FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'kypo2-free-form-question-edit',
  templateUrl: './free-form-question-edit.component.html',
  styleUrls: ['./free-form-question-edit.component.css']
})
/**
 * Component for editing a question of type Free Form
 */
export class FreeFormQuestionEditComponent extends BaseComponent
  implements OnInit, OnChanges {
  @Input('question') question: FreeFormQuestion;
  @Input('isTest') isTest: boolean;
  @Input('required') required: boolean;

  @Output('question') questionChange = new EventEmitter();

  freeFormQuestionFormGroup: FreeFormQuestionFormGroup;

  maxQuestionScore = 100;
  maxQuestionPenalty = 100;

  constructor(private alertService: AlertService) {
    super();
  }

  ngOnInit() {}

  get title() {
    return this.freeFormQuestionFormGroup.formGroup.get('title');
  }
  get answers() {
    return <FormArray>this.freeFormQuestionFormGroup.formGroup.get('answers');
  }
  get score() {
    return this.freeFormQuestionFormGroup.formGroup.get('score');
  }
  get penalty() {
    return this.freeFormQuestionFormGroup.formGroup.get('penalty');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.freeFormQuestionFormGroup) {
      this.freeFormQuestionFormGroup = new FreeFormQuestionFormGroup(
        this.maxQuestionScore,
        this.maxQuestionPenalty
      );
      this.checkState();
    }
    if ('question' in changes) {
      this.setInitialValues();
    }
    if ('isTest' in changes && !changes['isTest'].isFirstChange()) {
      this.checkState();
      if (!this.isTest) {
        this.penalty.setValue(0);
        this.clearAnswers();
      }
    }
    if ('required' in changes && !changes['required'].isFirstChange()) {
      this.checkState();
      this.requiredChanged();
    }
  }

  /**
   * Reacts when user changes an input
   */
  contentChanged() {
    this.freeFormQuestionFormGroup.formGroup.updateValueAndValidity();
    this.freeFormQuestionFormGroup.formGroup.markAsDirty();
    this.questionChange.emit();
  }

  /**
   * Determines whether the user has saved all his work and can leave the component
   * @returns {boolean} true if does not have any unsaved changes, false otherwise
   */
  canDeactivate(): boolean {
    return !this.freeFormQuestionFormGroup.formGroup.dirty;
  }

  /**
   * Validates input and saves it through REST
   */
  saveChanges() {
    if (this.freeFormQuestionFormGroup.formGroup.valid) {
      this.setInputValues();
      this.freeFormQuestionFormGroup.formGroup.markAsPristine();
    }
  }

  removeAnswer(index: number) {
    this.answers.removeAt(index);
    this.contentChanged();
  }

  addAnswer() {
    (this.answers as FormArray).push(new FormControl('', Validators.required));
    this.contentChanged();
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  requiredChanged() {
    if (!this.required) {
      this.score.setValue(0);
    }
  }

  private clearAnswers() {
    this.answers.clear();
    this.contentChanged();
  }

  /**
   * Sets initial values from passed question to the user input components
   */
  private setInitialValues() {
    this.title.setValue(this.question.title);
    this.question.correctAnswers.forEach(element => {
      this.answers.push(new FormControl(element, Validators.required));
    });
    this.score.setValue(this.question.score);
    this.penalty.setValue(this.question.penalty);
    this.required = this.question.required;
  }

  /**
   * Sets values from user input to the question object
   */
  private setInputValues() {
    this.question.title = this.title.value;
    this.question.correctAnswers = this.answers.value;
    this.question.required = this.required;

    if (this.question.required) {
      this.question.score = this.score.value;
    } else {
      this.question.score = 0;
    }
    if (this.isTest) {
      this.question.penalty = this.penalty.value;
    } else {
      this.question.penalty = 0;
    }
  }

  /**
   * Enables/disables score and penalty form field based on required and isTest inputs
   */
  checkState() {
    if (this.required) {
      this.score.enable();
    } else {
      this.score.disable();
    }
    if (this.isTest) {
      this.freeFormQuestionFormGroup.addAnswersValidator();
    } else {
      this.freeFormQuestionFormGroup.removeAnswersValidator();
    }
    if (this.required && this.isTest) {
      this.penalty.enable();
    } else {
      this.penalty.disable();
    }
    this.freeFormQuestionFormGroup.formGroup.updateValueAndValidity();
  }
}
