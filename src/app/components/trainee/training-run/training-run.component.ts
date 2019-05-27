import { Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractLevel} from "../../../model/level/abstract-level";
import {ActiveTrainingRunService} from "../../../services/trainee/active-training-run.service";

@Component({
  selector: 'training-run',
  templateUrl: './training-run.component.html',
  styleUrls: ['./training-run.component.css']
})
/**
 * Main component of players (trainee) training. Displays window with current level of a training and navigation to the next.
 * Optionally displays stepper with progress of the training and timer counting time from the start of a training.
 */
export class TrainingRunComponent implements OnInit, OnDestroy {

  levels: AbstractLevel[];

  selectedStep: number;
  isStepperDisplayed: boolean;
  isTimerDisplayed: boolean;
  startTime: Date;
  isLoading = false;

  activeLevelChangeSubscription;

  constructor(private activeTrainingRunService: ActiveTrainingRunService) {
  }

  ngOnInit() {
    this.initData();
    this.subscribeToActiveLevelChange();
    this.isTimerDisplayed = true;
  }

  ngOnDestroy() {
    if (this.activeLevelChangeSubscription) {
      this.activeLevelChangeSubscription.unsubscribe();
    }
  }

  private initData() {
    this.levels = this.activeTrainingRunService.getLevels();
    this.startTime = this.activeTrainingRunService.getStartTime();
    this.isStepperDisplayed = this.activeTrainingRunService.getIsStepperDisplayed();
    this.selectedStep = this.activeTrainingRunService.getActiveLevel().order;
  }


  private subscribeToActiveLevelChange() {
    this.activeTrainingRunService.onActiveLevelChanged.subscribe(
      activeLevel => this.selectedStep += 1
    );
  }
}

