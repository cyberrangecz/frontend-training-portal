import {Component, Input, OnInit} from '@angular/core';
import {InfoLevel} from "../../../../../model/level/info-level";
import {ActiveTrainingRunService} from "../../../../../services/active-training-run.service";

@Component({
  selector: 'training-run-info-level',
  templateUrl: './training-run-info-level.component.html',
  styleUrls: ['./training-run-info-level.component.css']
})
/**
 * Component to display info level in a training run. Info level is automatically unlocked and user can continue
 * to the next level whenever he wants
 */
export class TrainingRunInfoLevelComponent implements OnInit {

  @Input('level') level: InfoLevel;

  constructor(private activeLevelService: ActiveTrainingRunService) { }

  ngOnInit() {
    this.activeLevelService.unlockCurrentLevel();
  }

}
