import {Component, Input, OnInit} from '@angular/core';
import {AssessmentLevel} from "../../../../../model/level/assessment-level";
import {ActiveTrainingRunLevelsService} from "../../../../../services/active-training-run-levels.service";

@Component({
  selector: 'training-run-assessment-level',
  templateUrl: './training-run-assessment-level.component.html',
  styleUrls: ['./training-run-assessment-level.component.css']
})
export class TrainingRunAssessmentLevelComponent implements OnInit {

  @Input('level') level: AssessmentLevel;

  constructor(private activeLevelService: ActiveTrainingRunLevelsService) { }

  ngOnInit() {
    this.activeLevelService.unlockCurrentLevel();
  }

}
