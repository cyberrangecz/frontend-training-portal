import {Component, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren} from '@angular/core';
import {AssessmentLevel} from "../../../../../model/level/assessment-level";
import {ActiveTrainingRunService} from "../../../../../services/trainee/active-training-run.service";
import {TraineeQuestionComponent} from "./question/trainee-question.component";
import {AbstractQuestion} from "../../../../../model/questions/abstract-question";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorHandlerService} from "../../../../../services/shared/error-handler.service";
import {TrainingRunAssessmentLevelService} from "../../../../../services/trainee/training-run-assessment-level.service";
import {AssessmentTypeEnum} from "../../../../../model/enums/assessment-type.enum";

@Component({
  selector: 'training-run-assessment-level',
  templateUrl: './training-run-assessment-level.component.html',
  styleUrls: ['./training-run-assessment-level.component.css']
})
/**
 * Component for displaying assessment level in a trainees training run
 */
export class TrainingRunAssessmentLevelComponent implements OnInit, OnChanges {

  @ViewChildren(TraineeQuestionComponent) questionComponents: QueryList<TraineeQuestionComponent>;
  @Input('level') level: AssessmentLevel;

  hasNextLevel: boolean;
  canSubmit: boolean;
  isSubmitted: boolean = false;

  constructor(private assessmentLevelService: TrainingRunAssessmentLevelService,
              private activeLevelService: ActiveTrainingRunService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private errorHandler: ErrorHandlerService) {
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

  onContentChanged() {
    this.checkCanSubmit();
  }


  /**
   * Validates answers and calls REST API to save user's answers
   */
  submit() {
    const results: AbstractQuestion[] = [];
    this.questionComponents.forEach(component =>
    {
      component.saveChanges();
      results.push(component.question);
    });
    this.sendSubmitRequest(results);
  }


  nextLevel() {
    this.activeLevelService.nextLevel()
      .subscribe(
        resp => {},
        err => this.errorHandler.displayHttpError(err, 'Moving to next level')
      );
  }

  finish() {
    this.activeLevelService.finish()
      .subscribe(
        resp => {},
        err => this.errorHandler.displayHttpError(err, 'Finishing training')
      )
  }

  private sendSubmitRequest(answers: AbstractQuestion[]) {
    this.assessmentLevelService.submit(this.activeLevelService.trainingRunId, answers)
      .subscribe(
        resp => this.onSubmitted(),
        err => this.onSubmittedError(err))
  }

  private onSubmittedError(err) {
    this.errorHandler.displayHttpError(err, 'Submitting answers');
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
    }
    else {
      if (this.level.questions.some(question => question.required)) {
        this.canSubmit = false;
        return;
      }
    }
    this.canSubmit = true;
  }
}
