import {AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AssessmentLevel} from "../../../../../model/level/assessment-level";
import {ActiveTrainingRunLevelsService} from "../../../../../services/active-training-run-levels.service";
import {TraineeQuestionComponent} from "./question/trainee-question.component";

@Component({
  selector: 'training-run-assessment-level',
  templateUrl: './training-run-assessment-level.component.html',
  styleUrls: ['./training-run-assessment-level.component.css']
})
/**
 * Component for displaying assessment level in a trainees training run
 */
export class TrainingRunAssessmentLevelComponent implements OnInit, AfterViewInit {

  @ViewChildren(TraineeQuestionComponent) questionComponents: QueryList<TraineeQuestionComponent>;
  @Input('level') level: AssessmentLevel;

  constructor(private activeLevelService: ActiveTrainingRunLevelsService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.tryUnlockCurrentLevel();
  }

  /**
   * Validates answers and calls REST API to save user's answers
   */
  submit() {
    this.questionComponents.forEach(component => component.saveChanges());
    // TODO: Submit user answers through REST
  }

  /**
   * Checks whether the questionnaire is complete and can be submitted. If true, unlocks the next button
   */
  onContentChanged() {
    this.tryUnlockCurrentLevel();
  }

  /**
   * Checks if all conditions to move to next level are met and unlocks or locks the current level
   */
  private tryUnlockCurrentLevel() {
    if (this.questionComponents.toArray().every(component => component.canBeSubmitted())) {
      this.activeLevelService.unlockCurrentLevel();
    } else {
      if (!this.activeLevelService.currentLevelLocked) {
        this.activeLevelService.lockCurrentLevel();
      }
    }
  }

}
