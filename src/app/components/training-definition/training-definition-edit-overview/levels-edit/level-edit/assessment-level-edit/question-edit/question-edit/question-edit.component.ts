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
import {AbstractQuestion} from '../../../../../../../../model/questions/abstract-question';
import {ExtendedMatchingItems} from '../../../../../../../../model/questions/extended-matching-items';
import {FreeFormQuestion} from '../../../../../../../../model/questions/free-form-question';
import {MultipleChoiceQuestion} from '../../../../../../../../model/questions/multiple-choice-question';
import {BaseComponent} from '../../../../../../../base.component';

@Component({
  selector: 'kypo2-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Wrapper component of a specific question type edit component. Resolves type of the question and creates sub component accordingly
 */
export class QuestionEditComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() question: AbstractQuestion;
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

  questionChanged(question: AbstractQuestion) {
    this.questionChange.emit(new QuestionChangeEvent(question, this.index));
  }

  onDelete(i: number) {
    this.delete.emit(i);
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
