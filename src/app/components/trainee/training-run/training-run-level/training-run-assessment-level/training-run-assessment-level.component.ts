import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
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
export class TrainingRunAssessmentLevelComponent implements OnInit {

  @ViewChildren(TraineeQuestionComponent) questionComponents: QueryList<TraineeQuestionComponent>;
  @Input('level') level: AssessmentLevel;

  constructor(private activeLevelService: ActiveTrainingRunLevelsService) { }

  ngOnInit() {
    this.activeLevelService.unlockCurrentLevel();
  }

  /**
   * Validates answers and calls
   */
  submit() {
    if (this.questionComponents.toArray().every(component => component.canBeSubmitted())) {
      this.questionComponents.forEach(component => component.saveChanges());
      // TODO: Submit user answers through REST
    }
  }

}
