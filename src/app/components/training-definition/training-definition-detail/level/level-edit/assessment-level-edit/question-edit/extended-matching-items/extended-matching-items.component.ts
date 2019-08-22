import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import {ExtendedMatchingItems} from "../../../../../../../../model/questions/extended-matching-items";
import {AlertService} from "../../../../../../../../services/shared/alert.service";
import {AlertTypeEnum} from "../../../../../../../../model/enums/alert-type.enum";
import { MatRadioButton } from "@angular/material/radio";
import {BaseComponent} from "../../../../../../../base.component";
import { Validators, FormControl, FormArray } from '@angular/forms';
import { ExtendedMatchingItemsFormGroup } from './extended-matching-items-form-group';

@Component({
  selector: "extended-matching-items",
  templateUrl: "./extended-matching-items.component.html",
  styleUrls: ["./extended-matching-items.component.css"]
})
/**
 * Component of a question of type Extended Matching Items
 */
export class ExtendedMatchingItemsComponent extends BaseComponent
  implements OnInit, OnChanges, AfterViewInit {
  @Input("question") question: ExtendedMatchingItems;
  @Input("isTest") isTest: boolean;
  @Input("required") required: boolean;

  @Output("question") questionChange = new EventEmitter();

  extendedMatchingQuestionFormGroup: ExtendedMatchingItemsFormGroup;

  maxQuestionScore: number = 100;
  maxQuestionPenalty: number = 100;

  @ViewChildren(MatRadioButton) radioButtons: QueryList<MatRadioButton>;

  constructor(
    private cdRef: ChangeDetectorRef,
    private alertService: AlertService
  ) {
    super();
  }

  ngOnInit() {}

  get title() {
    return this.extendedMatchingQuestionFormGroup.formGroup.get("title");
  }
  get rows() {
    return <FormArray>(
      this.extendedMatchingQuestionFormGroup.formGroup.get("rows")
    );
  }
  get cols() {
    return <FormArray>(
      this.extendedMatchingQuestionFormGroup.formGroup.get("cols")
    );
  }
  get correctAnswers() {
    return <FormArray>(
      this.extendedMatchingQuestionFormGroup.formGroup.get("correctAnswers")
    );
  }
  get score() {
    return this.extendedMatchingQuestionFormGroup.formGroup.get("score");
  }
  get penalty() {
    return this.extendedMatchingQuestionFormGroup.formGroup.get("penalty");
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.extendedMatchingQuestionFormGroup) {
      this.extendedMatchingQuestionFormGroup = new ExtendedMatchingItemsFormGroup(
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

  ngAfterViewInit() {
    this.setInitialStateOfRadioButtons();
    this.cdRef.detectChanges();
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
    this.extendedMatchingQuestionFormGroup.formGroup.updateValueAndValidity();
    this.extendedMatchingQuestionFormGroup.formGroup.markAsDirty();
    this.questionChange.emit();
  }

  requiredChanged() {
    if (!this.required) {
      this.score.setValue(0);
    }
  }

  /**
   * Determines whether the user has saved all his work and can leave the component
   * @returns {boolean} true if does not have any unsaved changes, false otherwise
   */
  canDeactivate(): boolean {
    return !this.extendedMatchingQuestionFormGroup.formGroup.dirty;
  }

  /**
   * Validates input and saved data through REST
   */
  saveChanges() {
    if (this.extendedMatchingQuestionFormGroup.formGroup.valid) {
      this.setInputValues();
      this.extendedMatchingQuestionFormGroup.formGroup.markAsPristine();
    }
  }

  /**
   * Clears all correct answers
   */
  clearAnswers() {
    this.correctAnswers.clear();
    if (this.radioButtons) {
      this.radioButtons.forEach(button => (button.checked = false));
    }
    this.contentChanged();
  }

  /**
   * Adds answer chosen by a user as a correct answer
   * @param i row coordinate in the matrix representing the possible answers (EMI table)
   * @param j col coordinate in the matrix representing the possible answers (EMI table)
   */
  onAnswerChanged(i: number, j: number) {
    this.deleteAnswerByRow(i);
    this.correctAnswers.push(new FormControl({ x: i, y: j }));
    this.contentChanged();
  }

  /**
   * Deletes row from the EMI table
   * @param index row coordinate in the matrix representing the EMI table
   */
  deleteRow(index: number) {
    this.rows.removeAt(index);
    this.deleteAnswerByRow(index);
    this.contentChanged();
  }

  /**
   * Adds new row to the EMI table
   */
  addRow() {
    this.rows.push(new FormControl("", Validators.required));
    this.contentChanged();
  }

  /**
   * Deletes column from the EMI table
   * @param index column coordinate in the matrix representing the EMI table
   */
  deleteColumn(index: number) {
    this.cols.removeAt(index);
    this.deleteAnswersByCol(index);
    this.contentChanged();
  }

  /**
   * Adds new column to the EMI table
   */
  addColumn() {
    this.cols.push(new FormControl("", Validators.required));
    this.contentChanged();
  }

  /**
   * Deletes all correct (selected) answers in a given column (usually used after the column itself was deleted)
   * @param colIndex index of a column in a matrix representing the EMI table
   */
  private deleteAnswersByCol(colIndex: number) {
    const answersToDelete = this.correctAnswers.controls.filter(
      answer => answer.value.y === colIndex
    );
    if (answersToDelete.length > 0) {
      answersToDelete.forEach(answerToDelete => {
        const indexOfAnswerToDelete = this.correctAnswers.controls.indexOf(
          answerToDelete
        );
        if (indexOfAnswerToDelete > -1) {
          this.correctAnswers.removeAt(indexOfAnswerToDelete);
        }
      });
    }
  }

  /**
   * Deletes correct (selected) answer in a given row (usually used after the column itself was deleted)
   * @param rowIndex index of a row in a matrix representing the EMI table
   */
  private deleteAnswerByRow(rowIndex: number) {
    const answerToDelete = this.correctAnswers.controls.find(
      answer => answer.value.x === rowIndex
    );
    if (answerToDelete) {
      const indexOfAnswerToDelete = this.correctAnswers.controls.indexOf(
        answerToDelete
      );
      if (indexOfAnswerToDelete > -1) {
        this.correctAnswers.removeAt(indexOfAnswerToDelete);
      }
    }
  }

  /**
   * Sets initial values from passed question object to user input components
   */
  private setInitialValues() {
    this.title.setValue(this.question.title);
    this.question.rows.forEach(element => {
      this.rows.push(new FormControl(element, Validators.required));
    });
    this.question.cols.forEach(element => {
      this.cols.push(new FormControl(element, Validators.required));
    });
    this.question.correctAnswers.forEach(element => {
      this.correctAnswers.push(new FormControl(element));
    });
    this.score.setValue(this.question.score);
    this.penalty.setValue(this.question.penalty);
    this.required = this.question.required;
    this.rows.markAllAsTouched();
    this.cols.markAllAsTouched();
  }

  /**
   * Sets values from user input components to the question object
   */
  private setInputValues() {
    this.question.title = this.title.value;
    this.question.rows = this.rows.value;
    this.question.cols = this.cols.value;
    this.question.correctAnswers = this.correctAnswers.value;
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
   * Sets initial state of every radio button (checked / not checked) based on the correct answers coordinates
   */
  private setInitialStateOfRadioButtons() {
    this.radioButtons.forEach(button => {
      const buttonValue = {
        x: button.value.x,
        y: button.value.y
      };

      if (
        this.correctAnswers.value.find(
          answer => answer.x === buttonValue.x && answer.y === buttonValue.y
        )
      ) {
        button.checked = true;
      }
    });
  }

  /**
   * Changes extendedMatchingQuestionFormGroup based on required and isTest inputs
   */
  checkState() {
    if (this.required) {
      this.score.enable();
    } else {
      this.score.disable();
    }
    if (this.isTest) {
      this.extendedMatchingQuestionFormGroup.addAnswersValidator();
    } else {
      this.extendedMatchingQuestionFormGroup.removeAnswersValidator();
    }
    if (this.required && this.isTest) {
      this.penalty.enable();
    } else {
      this.penalty.disable();
    }
    this.extendedMatchingQuestionFormGroup.formGroup.updateValueAndValidity();
  }
}
