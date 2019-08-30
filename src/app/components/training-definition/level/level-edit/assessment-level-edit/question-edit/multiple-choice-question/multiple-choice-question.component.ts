import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MultipleChoiceQuestion} from "../../../../../../../model/questions/multiple-choice-question";
import {AlertService} from "../../../../../../../services/shared/alert.service";
import {AlertTypeEnum} from "../../../../../../../model/enums/alert-type.enum";
import { MatCheckboxChange } from "@angular/material/checkbox";
import {BaseComponent} from "../../../../../../base.component";
import { MultipleChoiceFormGroup } from './multiple-choice-question-form-group';
import { FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: "multiple-choice-question",
  templateUrl: "./multiple-choice-question.component.html",
  styleUrls: ["./multiple-choice-question.component.css"]
})
/**
 * Component of a question of type Multiple Choice Question
 */
export class MultipleChoiceQuestionComponent extends BaseComponent
  implements OnInit, OnChanges {
  @Input("question") question: MultipleChoiceQuestion;
  @Input("isTest") isTest: boolean;
  @Input("required") required: boolean;
  @Output("question") questionChange = new EventEmitter();

  multipleChoicesFormGroup: MultipleChoiceFormGroup;
  maxQuestionScore: number = 100;
  maxQuestionPenalty: number = 100;

  constructor(private alertService: AlertService) {
    super();
  }

  ngOnInit() {}

  get title() {
    return this.multipleChoicesFormGroup.formGroup.get("title");
  }
  get options() {
    return <FormArray>this.multipleChoicesFormGroup.formGroup.get("options");
  }
  get correctAnswersIndices() {
    return this.multipleChoicesFormGroup.formGroup.get("correctAnswersIndices");
  }
  get score() {
    return this.multipleChoicesFormGroup.formGroup.get("score");
  }
  get penalty() {
    return this.multipleChoicesFormGroup.formGroup.get("penalty");
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.multipleChoicesFormGroup) {
      this.multipleChoicesFormGroup = new MultipleChoiceFormGroup(
        this.maxQuestionScore,
        this.maxQuestionPenalty
      );
      this.checkState();
    }
    if ("question" in changes) {
      this.setInitialValues();
    }
    if ("isTest" in changes && !changes["isTest"].isFirstChange()) {
      this.checkState();
      if (!this.isTest) {
        this.penalty.setValue(0);
        this.clearAnswers();
      }
    }
    if ("required" in changes && !changes["required"].isFirstChange()) {
      this.checkState();
      this.requiredChanged();
    }
  }

  /**
   * Helper method to enable tracking a variable accessed by *ngFor index
   * @param index
   * @param item
   */
  trackByFn(index: any, item: any) {
    return index;
  }

  /**
   * User made a change in the input
   */
  contentChanged() {
    this.multipleChoicesFormGroup.formGroup.updateValueAndValidity();
    this.multipleChoicesFormGroup.formGroup.markAsDirty();
    this.questionChange.emit();
  }
  /**
   * Deletes all answers selected by user
   */
  clearAnswers() {
    this.correctAnswersIndices.setValue([]);
    this.contentChanged();
  }

  /**
   * Determines whether the user has saved all his work and can leave the component
   * @returns {boolean} true if does not have any unsaved changes, false otherwise
   */
  canDeactivate(): boolean {
    return !this.multipleChoicesFormGroup.formGroup.dirty;
  }

  /**
   * Validates input and saved data through REST
   */
  saveChanges() {
    if (this.multipleChoicesFormGroup.formGroup.valid) {
      this.setInputValues();
      this.multipleChoicesFormGroup.formGroup.markAsPristine();
    }
  }

  /**
   * Called when user changed the answer (clicked on a checkbox
   * @param event event of checkbox change
   * @param index index of an answer which has been changed
   */
  onAnswerChanged(event: MatCheckboxChange, index: number) {
    if (event.checked) {
      this.addCorrectAnswer(index);
    } else {
      this.removeCorrectAnswer(index);
    }
  }

  /**
   * Deletes an option (one of the answers)
   * @param index index of the option which should be deleted
   */
  deleteOption(index: number) {
    this.options.removeAt(index);
    this.removeCorrectAnswer(index);
    this.contentChanged();
  }

  /**
   * Adds new option
   */
  addOption() {
    (this.options as FormArray).push(new FormControl("", Validators.required));
    this.contentChanged();
  }

  requiredChanged() {
    if (!this.required) {
      this.score.setValue(0);
    }
  }

  /**
   * Adds correct answer
   * @param index index of the answer which should be marked as correct
   */
  private addCorrectAnswer(index: number) {
    this.correctAnswersIndices.value.push(index);
    this.contentChanged();
    this.correctAnswersIndices.updateValueAndValidity();
  }

  /**
   * Removes given answer from correct answers
   * @param index index of the answer which should be deleted
   */
  private removeCorrectAnswer(index: number) {
    const indexToRemove = this.correctAnswersIndices.value.indexOf(index);
    if (indexToRemove != -1) {
      this.correctAnswersIndices.value.splice(indexToRemove, 1);
      this.contentChanged();
      this.correctAnswersIndices.updateValueAndValidity();
    }
  }

  /**
   * Sets initial values from passed question object to user inputs
   */
  private setInitialValues() {
    this.title.setValue(this.question.title);
    this.question.options.forEach(element => {
      let option = new FormControl(element, Validators.required);
      option.markAsTouched();
      (this.options as FormArray).push(option);
    });
    this.correctAnswersIndices.setValue(this.question.correctAnswersIndices);
    this.score.setValue(this.question.score);
    this.penalty.setValue(this.question.penalty);
    this.required = this.question.required;
  }

  /**
   * Sets values from user input to the question object
   */
  private setInputValues() {
    this.question.title = this.title.value;
    this.question.options = this.options.value;
    this.question.correctAnswersIndices = this.correctAnswersIndices.value;
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
      this.multipleChoicesFormGroup.addAnswersValidator();
    } else {
      this.multipleChoicesFormGroup.removeAnswersValidator();
    }
    if (this.required && this.isTest) {
      this.penalty.enable();
    } else {
      this.penalty.disable();
    }
    this.multipleChoicesFormGroup.formGroup.updateValueAndValidity();
  }
}
