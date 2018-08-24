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

@Component({
  selector: 'question-overview',
  templateUrl: './questions-overview.component.html',
  styleUrls: ['./questions-overview.component.css']
})
export class QuestionsOverviewComponent implements OnInit, OnChanges {

  @Input('questions') questions: string[];
  @Output('questions') questionsChange = new EventEmitter();

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
    this.questions.push('new question');
    this.dirty = true;
    this.questionsChanged();
  }

  /**
   * Creates new multiple choice question
   */
  addMCQ() {
    this.questions.push('new question');
    this.dirty = true;
    this.questionsChanged();
  }

  /**
   * Creates new extended matching items question
   */
  addEMI() {
    this.questions.push('new question');
    this.dirty = true;
    this.questionsChanged();
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

  private questionsChanged() {
    this.questionsChange.emit(this.questions);
  }
}
