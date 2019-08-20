import { Component, OnInit} from '@angular/core';
import {AbstractLevel} from "../../../model/level/abstract-level";
import {ActiveTrainingRunService} from "../../../services/training-run/active-training-run.service";
import {BaseComponent} from "../../base.component";
import {takeWhile} from "rxjs/operators";

@Component({
  selector: 'kypo2-training-run-detail',
  templateUrl: './training-run-detail.component.html',
  styleUrls: ['./training-run-detail.component.css']
})
/**
 * Main component of players (trainee) training. Displays window with current level of a training and navigation to the next.
 * Optionally displays stepper with progress of the training and timer counting time from the start of a training.
 */
export class TrainingRunDetailComponent extends BaseComponent implements OnInit {

  levels: AbstractLevel[];

  selectedStep: number;
  isStepperDisplayed: boolean;
  isTimerDisplayed: boolean;
  startTime: Date;
  isLoading = false;

  constructor(private activeTrainingRunService: ActiveTrainingRunService) {
    super();
  }

  ngOnInit() {
    this.initData();
    this.subscribeToActiveLevelChange();
    this.isTimerDisplayed = true;
  }

  private initData() {
    this.levels = this.activeTrainingRunService.getLevels();
    this.startTime = this.activeTrainingRunService.getStartTime();
    this.isStepperDisplayed = this.activeTrainingRunService.getIsStepperDisplayed();
    this.selectedStep = this.activeTrainingRunService.getActiveLevelPosition();
  }


  private subscribeToActiveLevelChange() {
    this.activeTrainingRunService.onActiveLevelChanged
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
      activeLevel => this.selectedStep += 1
    );
  }
}

