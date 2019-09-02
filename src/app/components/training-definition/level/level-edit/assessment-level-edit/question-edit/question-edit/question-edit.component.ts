import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ExtendedMatchingItemsEditComponent} from '../extended-matching-items-edit/extended-matching-items-edit.component';
import {MultipleChoiceQuestionEditComponent} from '../multiple-choice-question-edit/multiple-choice-question-edit.component';
import {FreeFormQuestionEditComponent} from '../free-form-question-edit/free-form-question-edit.component';
import {ExtendedMatchingItems} from '../../../../../../../model/questions/extended-matching-items';
import {FreeFormQuestion} from '../../../../../../../model/questions/free-form-question';
import {MultipleChoiceQuestion} from '../../../../../../../model/questions/multiple-choice-question';
import {AbstractQuestion} from '../../../../../../../model/questions/abstract-question';
import {BaseComponent} from '../../../../../../base.component';

@Component({
  selector: 'kypo2-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
/**
 * Wrapper component of a specific question type edit component. Resolves type of the question and creates sub component accordingly
 */
export class QuestionEditComponent extends BaseComponent implements OnInit, OnChanges {

  @Input('question') question: AbstractQuestion;
  @Input('isTest') isTest: boolean;
  @Input('required') required: boolean;

  @Output('question') questionChange = new EventEmitter();

  isFfq = false;
  isMcq = false;
  isEmi = false;

  @ViewChild(FreeFormQuestionEditComponent, { static: false }) ffqChild: FreeFormQuestionEditComponent;
  @ViewChild(MultipleChoiceQuestionEditComponent, { static: false }) mcqChild: MultipleChoiceQuestionEditComponent;
  @ViewChild(ExtendedMatchingItemsEditComponent, { static: false }) emiChild: ExtendedMatchingItemsEditComponent;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('question' in changes) {
      this.resolveQuestionType();
    }
  }

  questionChanged() {
    this.questionChange.emit();
  }

  /**
   * Validates input and saves changes of a child component
   */
  saveChanges() {
    if (this.isFfq) {
      return this.ffqChild.saveChanges();
    } else if (this.isMcq) {
      return this.mcqChild.saveChanges();
    } else {
      return this.emiChild.saveChanges();
    }
  }

  validateInput(): boolean {
    if (this.isFfq) {
      return this.ffqChild.freeFormQuestionFormGroup.formGroup.valid;
    } else if (this.isMcq) {
      return this.mcqChild.multipleChoicesFormGroup.formGroup.valid;
    } else {
      return this.emiChild.extendedMatchingQuestionFormGroup.formGroup.valid;
    }
  }

  /**
   * Determines whether the user has saved all his work and can leave the component
   * @returns {boolean} true does not have any unsaved changes, false otherwise
   */
  canDeactivate(): boolean {
    if (this.isFfq) {
      return this.ffqChild.canDeactivate();
    } else if (this.isMcq) {
      return this.mcqChild.canDeactivate();
    } else {
      return this.emiChild.canDeactivate();
    }
  }

  /**
   * Resolves whether the question is Free Form, Extended Matching Items, or Multiple Choice Question
   */
  private resolveQuestionType() {
    this.isFfq = this.question instanceof FreeFormQuestion;
    this.isEmi = this.question instanceof ExtendedMatchingItems;
    this.isMcq = this.question instanceof MultipleChoiceQuestion;
  }
}
