import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractLevel} from "../../../model/level/abstract-level";
import {ActivatedRoute, Router} from "@angular/router";
import {ActiveTrainingRunLevelsService} from "../../../services/active-training-run-levels.service";
import {TrainingRunLevelComponent} from "./training-run-level/training-run-level.component";
import {ComponentErrorHandlerService} from "../../../services/component-error-handler.service";


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

  @ViewChild(TrainingRunLevelComponent) trainingRunLevelChild: TrainingRunLevelComponent;

  levels: AbstractLevel[];

  selectedStep: number;
  withStepper: boolean;
  withTimer: boolean;
  startTime: Date;
  isLoading = false;

  displayNextButton = false;
  isActiveLevelLocked = true;
  levelLockSubscription;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private errorHandler: ComponentErrorHandlerService,
    private activeLevelsService: ActiveTrainingRunLevelsService) {
  }

  ngOnInit() {
    this.initData();
    this.subscribeLevelLockChange();
    this.selectedStep = 0;
    this.withStepper = true;
    this.withTimer = true;
  }

  ngOnDestroy() {
    if (this.levelLockSubscription) {
      this.levelLockSubscription.unsubscribe();
    }
  }

  /**
   * If it is possible (user finished current level), sets next level as active and navigates to it
   */
  nextLevel() {
    if (!this.isActiveLevelLocked) {
      this.trainingRunLevelChild.submit();
      if (this.activeLevelsService.hasNextLevel()) {
        this.activeLevelsService.nextLevel()
          .subscribe(resp => {
              this.selectedStep += 1;
            },
            err => {
              this.errorHandler.displayHttpError(err, "Loading next level");
            });
      }
      else {
        this.showResults();
      }
    }
  }

  /**
   * Sets if the next level button should be displayed
   * @param {boolean} value true if next level button should be displayed, false otherwise
   */
  setDisplayNextLevelButton(value: boolean) {
    this.displayNextButton = value;
    this.cdr.detectChanges();
  }

  /**
   * Navigates to page with results of current training
   */
  showResults() {
    this.router.navigate(['results'], {relativeTo: this.activeRoute.parent});
  }

  /**
   * Loads all necessary data about levels and sets up the training
   */
  private initData() {
    this.levels = this.activeLevelsService.getActiveLevels();
    this.selectedStep = 0;
  }

  /**
   * Subscribes to changes in level lock. Component is informed when user finished all necessary actions in the current level and is ready to continue
   */
  private subscribeLevelLockChange() {
    this.activeLevelsService.onLevelLockChanged.subscribe(
      lockChange => this.isActiveLevelLocked = lockChange
    );
  }
}

