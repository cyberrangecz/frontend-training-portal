import {Component, Input, OnInit} from '@angular/core';
import {InfoLevel} from "../../../../../model/level/info-level";
import {ActiveTrainingRunLevelsService} from "../../../../../services/active-training-run-levels.service";

@Component({
  selector: 'training-run-info-level',
  templateUrl: './training-run-info-level.component.html',
  styleUrls: ['./training-run-info-level.component.css']
})
export class TrainingRunInfoLevelComponent implements OnInit {

  @Input('level') level: InfoLevel;

  constructor(private activeLevelService: ActiveTrainingRunLevelsService) { }

  ngOnInit() {
    this.activeLevelService.unlockCurrentLevel();
  }

}
