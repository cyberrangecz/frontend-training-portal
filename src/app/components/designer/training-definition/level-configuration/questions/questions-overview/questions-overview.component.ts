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
import {DeleteDialogComponent} from "../../../delete-dialog/delete-dialog.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'question-overview',
  templateUrl: './questions-overview.component.html',
  styleUrls: ['./questions-overview.component.css']
})
/**
 * Wrapper component for questions inside the assessment level. Creates child question components.
 */
export class QuestionsOverviewComponent implements OnInit, OnChanges {

  @Input('questions') questions: AbstractQuestion[];
  @Input('isTest') isTest: boolean;

  @Output('questions') questionChange = new EventEmitter();

  @ViewChildren(QuestionConfigurationComponent) questionConfigurationChildren: QueryList<QuestionConfigurationComponent>;

  dirty = false;

  constructor(public dialog: MatDialog) { }

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
    const newFfq = new FreeFormQuestion('New Free Form Question');
    newFfq.required = this.isTest;
    this.questions.push(newFfq);
    this.dirty = true;
    this.questionChanged();
  }

  /**
   * Creates new multiple choice question
   */
  addMCQ() {
    const newMcq = new MultipleChoiceQuestion('New Multiple Choice Question');
    newMcq.options.push("");
    newMcq.options.push("");
    newMcq.required = this.isTest;
    this.questions.push(newMcq);
    this.dirty = true;
    this.questionChanged();
  }

  /**
   * Creates new extended matching items question
   */
  addEMI() {
    const newEmi = new ExtendedMatchingItems('New Extended Matching Items');
    newEmi.required = this.isTest;
    newEmi.cols.push("");
    newEmi.cols.push("");
    newEmi.rows.push("");
    newEmi.rows.push("");
    this.questions.push(newEmi);
    this.dirty = true;
    this.questionChanged();
  }

  questionChanged() {
    this.questionChange.emit()
  }

  /**
   * Deletes question on given index
   * @param index index of question which should be deleted
   */
  deleteQuestion(index: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data:
        {
          type: 'question',
          title: this.questions[index].title
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.questions.splice(index, 1);
        this.questionChanged();
      }
    });
  }

  /**
   * Validates input of every child component and saves user input to REST
   */
  saveChanges() {
    this.questionConfigurationChildren.forEach(child => child.saveChanges());
    this.dirty = false;
    // TODO: Save to REST (here or in child?)
  }

  private resolveInitialQuestions() {
    if (!this.questions) {
      this.questions = [];
    }
  }
}
