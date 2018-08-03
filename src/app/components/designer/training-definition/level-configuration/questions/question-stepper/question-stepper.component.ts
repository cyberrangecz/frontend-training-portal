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
  selector: 'question-stepper',
  templateUrl: './question-stepper.component.html',
  styleUrls: ['./question-stepper.component.css']
})
export class QuestionStepperComponent implements OnInit, OnChanges {

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

  addQuestion() {
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
