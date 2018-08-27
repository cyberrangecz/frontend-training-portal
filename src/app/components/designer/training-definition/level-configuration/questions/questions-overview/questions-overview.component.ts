import {
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
import {QuestionConfigurationComponent} from "../question-configuration/question-configuration.component";
import {AbstractQuestion} from "../../../../../../model/questions/abstract-question";
import {FreeFormQuestion} from "../../../../../../model/questions/free-form-question";
import {MultipleChoiceQuestion} from "../../../../../../model/questions/multiple-choice-question";
import {ExtendedMatchingItems} from "../../../../../../model/questions/extended-matching-items";

@Component({
  selector: 'question-overview',
  templateUrl: './questions-overview.component.html',
  styleUrls: ['./questions-overview.component.css']
})
export class QuestionsOverviewComponent implements OnInit, OnChanges {

  @Input('questions') questions: AbstractQuestion[];
  @ViewChildren(QuestionConfigurationComponent) questionConfigurationChildren: QueryList<QuestionConfigurationComponent>;

  dirty = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('questions' in changes) {
      this.resolveInitialQuestions();
    }
  }

  /**
   * Determines whether the user has saved all his work and can leave the component
   * @returns {boolean} true does not have any unsaved changes, false otherwise
   */
  canDeactivate(): boolean {
    return !this.dirty && this.questionConfigurationChildren.toArray().every(child => child.canDeactivate());
  }

  /**
   * Creates new free form question
   */
  addFFQ() {
    this.questions.push(new FreeFormQuestion('New Free Form Question'));
    this.dirty = true;
  }

  /**
   * Creates new multiple choice question
   */
  addMCQ() {
    this.questions.push(new MultipleChoiceQuestion('New Multiple Choice Question'));
    this.dirty = true;
  }

  /**
   * Creates new extended matching items question
   */
  addEMI() {
    this.questions.push(new ExtendedMatchingItems('New Extended Matching Items'));
    this.dirty = true;
  }

  deleteQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  saveChanges() {
    this.questionConfigurationChildren.forEach(child => child.saveChanges());
    this.dirty = false;
  }

  private resolveInitialQuestions() {
    if (!this.questions) {
      this.questions = [];
    }
  }
}
