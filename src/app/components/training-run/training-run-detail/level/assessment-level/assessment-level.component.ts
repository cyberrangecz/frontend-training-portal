import {Component, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren} from '@angular/core';
import {takeWhile} from 'rxjs/operators';
import {AssessmentTypeEnum} from '../../../../../model/enums/assessment-type.enum';
import {AssessmentLevel} from '../../../../../model/level/assessment-level';
import {AbstractQuestion} from '../../../../../model/questions/abstract-question';
import {ErrorHandlerService} from '../../../../../services/shared/error-handler.service';
import {RunningTrainingRunService} from '../../../../../services/training-run/running/running-training-run.service';
import {TrainingRunAssessmentLevelService} from '../../../../../services/training-run/running/training-run-assessment-level.service';
import {BaseComponent} from '../../../../base.component';
import {TraineeQuestionComponent} from './question/trainee-question.component';
@Component({
  selector: 'kypo2-assessment-level',
  templateUrl: './assessment-level.component.html',
  styleUrls: ['./assessment-level.component.css']
})
/**
 * Component that displays assessment level in a trainees training run. If the questions are type of test, trainee needs
 * to answer all of the questions before he can continue to the next level. If it questionnaire type, trainee can skip
 * answering the questions.
 */
export class AssessmentLevelComponent extends BaseComponent implements OnInit, OnChanges {

  @ViewChildren(TraineeQuestionComponent) questionComponents: QueryList<TraineeQuestionComponent>;
  @Input('level') level: AssessmentLevel;

  hasNextLevel: boolean;
  canSubmit: boolean;
  isSubmitted = false;

  constructor(private assessmentLevelService: TrainingRunAssessmentLevelService,
              private activeLevelService: RunningTrainingRunService,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  ngOnInit() {
    this.isSubmitted = false;
    this.hasNextLevel = this.activeLevelService.hasNextLevel();
    this.initCanSubmit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('level' in changes) {
      this.isSubmitted = false;
      this.hasNextLevel = this.activeLevelService.hasNextLevel();
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
    const results: AbstractQuestion[] = [];
    this.questionComponents.forEach(component => {
      component.saveChanges();
      results.push(component.question);
    });
    this.sendSubmitRequest(results);
  }

  /**
   * Calls service to move to the next level
   */
  nextLevel() {
    this.activeLevelService.nextLevel()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        resp => {},
        err => this.errorHandler.display(err, 'Moving to next level')
      );
  }

  /**
   * Calls service to finish the training run
   */
  finish() {
    this.activeLevelService.finish()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        resp => {},
        err => this.errorHandler.display(err, 'Finishing training')
      );
  }

  private sendSubmitRequest(answers: AbstractQuestion[]) {
    this.assessmentLevelService.submit(this.activeLevelService.trainingRunId, answers)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        resp => this.onSubmitted(),
        err => this.onSubmittedError(err));
  }

  private onSubmittedError(err) {
    this.errorHandler.display(err, 'Submitting answers');
    this.isSubmitted = false;
  }

  private onSubmitted() {
    this.isSubmitted = true;
    if (this.hasNextLevel) {
      this.nextLevel();
    } else {
      this.finish();
    }
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
