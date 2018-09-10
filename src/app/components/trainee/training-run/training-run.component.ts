import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TrainingRun} from "../../../model/training/training-run";
import {TrainingInstance} from "../../../model/training/training-instance";
import {AbstractLevel} from "../../../model/level/abstract-level";
import {ActivatedRoute, Router} from "@angular/router";
import {LevelGetterService} from "../../../services/data-getters/level-getter.service";
import {TrainingRunGetterService} from "../../../services/data-getters/training-run-getter.service";
import {TrainingInstanceGetterService} from "../../../services/data-getters/training-instance-getter.service";
import {ActiveTrainingRunLevelsService} from "../../../services/active-training-run-levels.service";
import {TrainingDefinitionGetterService} from "../../../services/data-getters/training-definition-getter.service";
import {TrainingRunLevelComponent} from "./training-run-level/training-run-level.component";
import {flatMap, map, switchMap} from "rxjs/operators";


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

  trainingRun: TrainingRun;
  trainingInstance: TrainingInstance;
  levels: AbstractLevel[];

  selectedStep: number;
  withStepper: boolean;
  withTimer: boolean;
  isLoading = true;

  displayNextButton = false;
  isActiveLevelLocked = true;
  levelLockSubscription;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private activeLevelsService: ActiveTrainingRunLevelsService,
    private levelGetter: LevelGetterService,
    private trainingRunGetter: TrainingRunGetterService,
    private trainingInstanceGetter: TrainingInstanceGetterService,
    private trainingDefinitionGetter: TrainingDefinitionGetterService) {
  }

  ngOnInit() {
    this.initDataFromUrl();
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
      this.selectedStep += 1;
      this.activeLevelsService.nextLevel();
      this.trainingRun.currentLevel = this.activeLevelsService.getActiveLevel().id;
      this.router.navigate(['level', this.selectedStep + 1], {relativeTo: this.activeRoute.parent});
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
   * Loads all necessary data about levels and trainings from url and sets up the training
   */
  private initDataFromUrl() {
    const id = +this.activeRoute.snapshot.paramMap.get('id');
    if (id && !Number.isNaN(id)) {
      this.trainingRunGetter.getTrainingRunById(id)
        .pipe(switchMap(trainingRun => {
          this.trainingRun = trainingRun;
          return this.trainingInstanceGetter.getTrainingInstanceById(trainingRun.trainingInstanceId);
        }))
        .pipe(switchMap(trainingInstance => {
          this.trainingInstance = trainingInstance;
          return this.trainingDefinitionGetter.getTrainingDefById(trainingInstance.trainingDefinitionId);
        }))
        .pipe(switchMap(trainingDef => {
          this.withStepper = trainingDef.showProgress;
          return this.levelGetter.getLevelsByTrainingDefId(trainingDef.id);
        }))
        .pipe(switchMap(levels => {
          this.levels = levels;
          this.activeLevelsService.setActiveLevels(this.levels);
          this.findInitialLevel();
          this.isLoading = false;
          return levels;
        }))
        .subscribe();
    }
  }

  /**
   * Finds initial level based on parameter passed in url and sets it as an active level
   */
  private findInitialLevel() {
    const initialLevel = +this.activeRoute.snapshot.paramMap.get('order');
    if (initialLevel && !Number.isNaN(initialLevel)) {
      this.selectedStep = initialLevel - 1;
      this.activeLevelsService.setActiveLevel(initialLevel - 1);
      this.trainingRun.currentLevel = this.activeLevelsService.getActiveLevel().id;
    }
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

