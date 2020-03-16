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
import {QuestionChangeEvent} from '../../../../../../../../model/events/question-change-event';
import {Question} from '../../../../../../../../model/questions/question';
import {ExtendedMatchingItems} from '../../../../../../../../model/questions/extended-matching-items';
import {FreeFormQuestion} from '../../../../../../../../model/questions/free-form-question';
import {MultipleChoiceQuestion} from '../../../../../../../../model/questions/multiple-choice-question';
import {KypoBaseComponent} from 'kypo-common';

/**
 * Wrapper component of a specific question type edit component. Resolves type of the question and creates sub component accordingly
 */
@Component({
  selector: 'kypo2-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionEditComponent extends KypoBaseComponent implements OnInit, OnChanges {

  @Input() question: Question;
  @Input() isTest: boolean;
  @Input() index: number;

  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() questionChange: EventEmitter<QuestionChangeEvent> = new EventEmitter();

  isFfq = false;
  isMcq = false;
  isEmi = false;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('question' in changes) {
      this.resolveQuestionType();
    }
  }

  /**
   * Passes received event to parent component
   * @param question changed question
   */
  questionChanged(question: Question) {
    this.questionChange.emit(new QuestionChangeEvent(question, this.index));
  }

  /**
   * Emits event to delete selected question
   * @param i index of question to delete
   */
  onDelete(i: number) {
    this.delete.emit(i);
  }

  private resolveQuestionType() {
    this.isFfq = this.question instanceof FreeFormQuestion;
    this.isEmi = this.question instanceof ExtendedMatchingItems;
    this.isMcq = this.question instanceof MultipleChoiceQuestion;
  }

}
