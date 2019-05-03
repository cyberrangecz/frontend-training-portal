import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractLevel} from "../../../model/level/abstract-level";
import {ActivatedRoute, Router} from "@angular/router";
import {ActiveTrainingRunService} from "../../../services/trainee/active-training-run.service";
import {TrainingRunLevelComponent} from "./training-run-level/training-run-level.component";
import {ErrorHandlerService} from "../../../services/shared/error-handler.service";
import {switchMap} from 'rxjs/operators';


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
  withStepper: boolean;
  withTimer: boolean;
  startTime: Date;
  isLoading = false;

  activeLevelChangeSubscription;

  constructor(private activeTrainingRunService: ActiveTrainingRunService) {
  }

  ngOnInit() {
    this.initData();
    this.subscribeToActiveLevelChange();
    this.withStepper = true;
    this.withTimer = true;
  }

  ngOnDestroy() {
    if (this.activeLevelChangeSubscription) {
      this.activeLevelChangeSubscription.unsubscribe();
    }
  }

  private initData() {
    this.levels = this.activeTrainingRunService.getLevels();
    this.selectedStep = 0;
  }


  private subscribeToActiveLevelChange() {
    this.activeTrainingRunService.onActiveLevelChanged.subscribe(
      activeLevel => this.selectedStep += 1
    );
  }
}

