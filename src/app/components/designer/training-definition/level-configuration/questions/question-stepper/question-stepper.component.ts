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


  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('questions' in changes) {
      this.resolveInitialQuestions();
    }
  }

  addQuestion() {
    this.questions.push('new question');
    this.questionsChanged();
  }

  saveChanges() {
    this.questionConfigurationChildren.forEach(child => child.saveChanges());
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
