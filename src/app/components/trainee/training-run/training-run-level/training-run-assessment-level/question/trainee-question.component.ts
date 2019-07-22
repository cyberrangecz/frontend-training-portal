import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {AbstractQuestion} from "../../../../../../model/questions/abstract-question";
import {ExtendedMatchingItems} from "../../../../../../model/questions/extended-matching-items";
import {FreeFormQuestion} from "../../../../../../model/questions/free-form-question";
import {MultipleChoiceQuestion} from "../../../../../../model/questions/multiple-choice-question";
import {FreeFormQuestionTraineeComponent} from "./free-form-question/free-form-question-trainee.component";
import {ExtendedMatchingItemsTraineeComponent} from "./extended-matching-items/extended-matching-items-trainee.component";
import {MultipleChoiceQuestionTraineeComponent} from "./multiple-choice-question/multiple-choice-question-trainee.component";
import {BaseComponent} from "../../../../../base.component";

@Component({
  selector: 'trainee-question',
  templateUrl: './trainee-question.component.html',
  styleUrls: ['./trainee-question.component.css']
})
export class TraineeQuestionComponent extends BaseComponent implements OnInit, OnChanges {

  @Input('question') question: AbstractQuestion;
  @Input('index') index: number;

  @Output('contentChanged') contentChanged: EventEmitter<number> = new EventEmitter();

  @ViewChild(FreeFormQuestionTraineeComponent, { static: false }) ffqChild: FreeFormQuestionTraineeComponent;
  @ViewChild(ExtendedMatchingItemsTraineeComponent, { static: false }) emiChild: ExtendedMatchingItemsTraineeComponent;
  @ViewChild(MultipleChoiceQuestionTraineeComponent, { static: false }) mcqChild: MultipleChoiceQuestionTraineeComponent;


  isEmi: boolean = false;
  isFfq: boolean = false;
  isMcq: boolean = false;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('question' in changes) {
      this.resolveQuestionType();
    }
  }

  /**
   * Calls child component find out if every mandatory question is answered
   */
  canBeSubmitted(): boolean {
    if (this.isEmi) {
      return this.emiChild.canBeSubmitted();
    }
    if (this.isFfq) {
      return this.ffqChild.canBeSubmitted();
    }
    return this.mcqChild.canBeSubmitted();
  }

  /**
   * Call child component to save user input to question object
   */
  saveChanges() {
    if (this.isEmi) {
      this.emiChild.saveChanges();
    }
    if (this.isFfq) {
      this.ffqChild.saveChanges();
    }
    if (this.isMcq) {
      this.mcqChild.saveChanges();
    }
  }

  onContentChanged(event: { index: number, question: AbstractQuestion }) {
    this.question = event.question;
    this.contentChanged.emit(event.index);
  }
  /**
   * Resolves type of question to create appropriate child component
   */
  private resolveQuestionType() {
    this.isEmi = this.question instanceof ExtendedMatchingItems;
    this.isFfq = this.question instanceof FreeFormQuestion;
    this.isMcq = this.question instanceof MultipleChoiceQuestion;
  }
}
