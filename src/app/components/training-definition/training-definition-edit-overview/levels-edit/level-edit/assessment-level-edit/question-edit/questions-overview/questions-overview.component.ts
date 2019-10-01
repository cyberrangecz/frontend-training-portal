import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {AbstractQuestion} from '../../../../../../../../model/questions/abstract-question';
import {FreeFormQuestion} from '../../../../../../../../model/questions/free-form-question';
import {MultipleChoiceQuestion} from '../../../../../../../../model/questions/multiple-choice-question';
import {ExtendedMatchingItems} from '../../../../../../../../model/questions/extended-matching-items';
import {ActionConfirmationDialogComponent} from '../../../../../../../shared/action-confirmation-dialog/action-confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {BaseComponent} from '../../../../../../../base.component';
import {takeWhile} from 'rxjs/operators';
import {QuestionChangeEvent} from '../../../../../../../../model/events/question-change-event';

@Component({
  selector: 'kypo2-question-overview',
  templateUrl: './questions-overview.component.html',
  styleUrls: ['./questions-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Wrapper component for questions inside the assessment level. Creates child question components.
 */
export class QuestionsOverviewComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() questions: AbstractQuestion[];
  @Input() isTest: boolean;
  @Input() disabled: boolean;
  @Output() questionsChange: EventEmitter<AbstractQuestion[]> = new EventEmitter();

  questionsHasError: boolean;

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('questions' in changes && this.questions) {
      this.calculateHasError();
    }
    if ('isTest' in changes && !changes['isTest'].isFirstChange()) {
      if (this.isTest && this.questions) {
        this.questions.forEach(question => question.required = true);
        this.questionChanged();
      }
    }
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
    newMcq.options.push('Option 1');
    newMcq.options.push('Option 2');
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
    newEmi.cols.push('Column 1');
    newEmi.cols.push('Column 2');
    newEmi.rows.push('Row 1');
    newEmi.rows.push('Row 2');
    this.questions.push(newEmi);
    this.questionChanged();
  }

  questionChanged(event: QuestionChangeEvent = null) {
    this.calculateHasError();
    if (event) {
      this.questions[event.index] = event.question;
    }
    this.questionsChange.emit(this.questions);
  }

  /**
   * Deletes question on given index
   * @param index index of question which should be deleted
   */
  onDelete(index: number) {
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

  private calculateHasError() {
    this.questionsHasError = this.questions.some(question => !question.valid);
  }
}
