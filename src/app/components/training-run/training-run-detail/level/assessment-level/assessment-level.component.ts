import {
  ChangeDetectionStrategy,
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
import {take} from 'rxjs/operators';
import {AssessmentTypeEnum} from '../../../../../model/enums/assessment-type.enum';
import {AssessmentLevel} from '../../../../../model/level/assessment-level';
import {Question} from '../../../../../model/questions/question';
import {KypoBaseComponent} from 'kypo-common';
import {TraineeQuestionComponent} from './question/trainee-question.component';
import {TrainingRunAssessmentLevelService} from '../../../../../services/training-run/running/training-run-assessment-level.service';

@Component({
  selector: 'kypo2-assessment-level',
  templateUrl: './assessment-level.component.html',
  styleUrls: ['./assessment-level.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Component that displays assessment level in a trainees training run. If the questions are type of test, trainee needs
 * to answer all of the questions before he can continue to the next level. If it questionnaire type, trainee can skip
 * answering the questions.
 */
export class AssessmentLevelComponent extends KypoBaseComponent implements OnInit, OnChanges {

  @Input() level: AssessmentLevel;
  @Input() isLast: boolean;
  @Output() next: EventEmitter<void> = new EventEmitter();
  @ViewChildren(TraineeQuestionComponent) questionComponents: QueryList<TraineeQuestionComponent>;

  canSubmit: boolean;
  isSubmitted = false;

  constructor(private assessmentService: TrainingRunAssessmentLevelService) {
    super();
  }

  ngOnInit() {
    this.isSubmitted = false;
    this.initCanSubmit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('level' in changes) {
      this.isSubmitted = false;
      this.initCanSubmit();
    }
  }

  /**
   * When user changes his answers, check if answers are valid (and can be submitted) is done
   */
  onContentChanged() {
    this.checkCanSubmit();
  }

  /**
   * Gathers all trainees answers and calls service to save then
   */
  submit() {
    const results: Question[] = [];
    this.questionComponents.forEach(component => {
      component.saveChanges();
      results.push(component.question);
    });
    this.sendSubmitRequest(results);
  }

  /**
   * Emit event to next level to move to the next level
   */
  onNext() {
    this.next.emit();
  }

  private sendSubmitRequest(answers: Question[]) {
    this.assessmentService.submit(answers)
      .pipe(
        take(1)
      ).subscribe(
        _ => this.isSubmitted = true,
        _ => this.isSubmitted = false);
  }

  private checkCanSubmit() {
    this.canSubmit = this.questionComponents
      .toArray()
      .every(component =>
        component.canBeSubmitted());
  }

  private initCanSubmit() {
    if (this.level.assessmentType === AssessmentTypeEnum.Test) {
      this.canSubmit = false;
      return;
    } else {
      if (this.level.questions.some(question => question.required)) {
        this.canSubmit = false;
        return;
      }
    }
    this.canSubmit = true;
  }
}
