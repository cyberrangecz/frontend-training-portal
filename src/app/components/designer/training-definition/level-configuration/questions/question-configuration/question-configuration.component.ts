import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ExtendedMatchingItemsComponent} from "../extended-matching-items/extended-matching-items.component";
import {MultipleChoiceQuestionComponent} from "../multiple-choice-question/multiple-choice-question.component";
import {FreeFormQuestionComponent} from "../free-form-question/free-form-question.component";
import {ExtendedMatchingItems} from "../../../../../../model/questions/extended-matching-items";
import {FreeFormQuestion} from "../../../../../../model/questions/free-form-question";
import {MultipleChoiceQuestion} from "../../../../../../model/questions/multiple-choice-question";
import {AbstractQuestion} from "../../../../../../model/questions/abstract-question";

@Component({
  selector: 'question-configuration',
  templateUrl: './question-configuration.component.html',
  styleUrls: ['./question-configuration.component.css']
})
/**
 * Wrapper component of a specific question type. Resolves type of the question and creates sub component accordingly
 */
export class QuestionConfigurationComponent implements OnInit, OnChanges {

  @Input('question') question: AbstractQuestion;

  isFfq: boolean = false;
  isMcq: boolean = false;
  isEmi: boolean = false;

  @ViewChild(FreeFormQuestionComponent) ffqChild: FreeFormQuestionComponent;
  @ViewChild(MultipleChoiceQuestionComponent) mcqChild: MultipleChoiceQuestionComponent;
  @ViewChild(ExtendedMatchingItemsComponent) emiChild: ExtendedMatchingItemsComponent;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('question' in changes) {
      this.resolveQuestionType();
    }
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
