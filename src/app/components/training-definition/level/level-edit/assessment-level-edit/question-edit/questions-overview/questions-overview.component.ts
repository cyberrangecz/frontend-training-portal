import {
  AfterViewInit, ChangeDetectorRef,
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
import {QuestionEditComponent} from '../question-edit/question-edit.component';
import {AbstractQuestion} from '../../../../../../../model/questions/abstract-question';
import {FreeFormQuestion} from '../../../../../../../model/questions/free-form-question';
import {MultipleChoiceQuestion} from '../../../../../../../model/questions/multiple-choice-question';
import {ExtendedMatchingItems} from '../../../../../../../model/questions/extended-matching-items';
import {ActionConfirmationDialogComponent} from '../../../../../../shared/action-confirmation-dialog/action-confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {BaseComponent} from '../../../../../../base.component';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'kypo2-question-overview',
  templateUrl: './questions-overview.component.html',
  styleUrls: ['./questions-overview.component.scss']
})
/**
 * Wrapper component for questions inside the assessment level. Creates child question components.
 */
export class QuestionsOverviewComponent extends BaseComponent implements OnInit, OnChanges, AfterViewInit {

  @Input('questions') questions: AbstractQuestion[];
  @Input('isTest') isTest: boolean;
  @Input('disabled') disabled: boolean;

  @Output('questions') questionChange = new EventEmitter();

  @ViewChildren(QuestionEditComponent) questionConfigurationChildren: QueryList<QuestionEditComponent>;

  dirty = false;

  constructor(public dialog: MatDialog,
              private cdRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('questions' in changes) {
      this.resolveInitialQuestions();
    }
    if ('isTest' in changes) {
      if (this.isTest && this.questions) {
        this.questions.forEach(question => question.required = true);
      }
    }
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
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
    this.questionChanged();
  }

  /**
   * Creates new multiple choice question
   */
  addMCQ() {
    const newMcq = new MultipleChoiceQuestion('New Multiple Choice Question');
    newMcq.options.push('');
    newMcq.options.push('');
    newMcq.required = this.isTest;
    this.questions.push(newMcq);
    this.questionChanged();
  }

  /**
   * Creates new extended matching items question
   */
  addEMI() {
    const newEmi = new ExtendedMatchingItems('New Extended Matching Items');
    newEmi.required = this.isTest;
    newEmi.cols.push('');
    newEmi.cols.push('');
    newEmi.rows.push('');
    newEmi.rows.push('');
    this.questions.push(newEmi);
    this.questionChanged();
  }

  questionChanged() {
    this.dirty = true;
    this.questionChange.emit();
  }

  /**
   * Deletes question on given index
   * @param index index of question which should be deleted
   */
  deleteQuestion(index: number) {
    const dialogRef = this.dialog.open(ActionConfirmationDialogComponent, {
      data:
        {
          type: 'question',
          action: 'delete',
          title: this.questions[index].title
        }
    });

    dialogRef.afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
      if (result && result.type === 'confirm') {
        this.questions.splice(index, 1);
        this.questionChanged();
      }
    });
  }

  /**
   * Validates input of every child component and saves user input to REST
   */
  save() {
    this.questionConfigurationChildren.forEach(child => child.saveChanges());
    const savedQuestion: AbstractQuestion[] = [];
    this.questionConfigurationChildren.forEach(child => savedQuestion.push(child.question));
    this.questions = savedQuestion;
    this.dirty = false;
  }

  validateInput(): boolean {
    return this.questionConfigurationChildren.toArray().every(child => child.validateInput());
  }

  private resolveInitialQuestions() {
    if (!this.questions) {
      this.questions = [];
    }
  }
}
