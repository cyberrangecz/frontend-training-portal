import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingRun} from "../../../model/training/training-run";
import {TrainingInstance} from "../../../model/training/training-instance";
import {AbstractLevel} from "../../../model/level/abstract-level";
import {ActivatedRoute, Router} from "@angular/router";
import {LevelGetterService} from "../../../services/data-getters/level-getter.service";
import {TrainingRunGetterService} from "../../../services/data-getters/training-run-getter.service";
import {TrainingInstanceGetterService} from "../../../services/data-getters/training-instance-getter.service";
import {ActiveTrainingRunLevelsService} from "../../../services/active-training-run-levels.service";


@Component({
  selector: 'training-run',
  templateUrl: './training-run.component.html',
  styleUrls: ['./training-run.component.css']
})
export class TrainingRunComponent implements OnInit, OnDestroy {

  trainingRun: TrainingRun;
  trainingInstance: TrainingInstance;
  levels: AbstractLevel[];

  selectedStep: number;
  withStepper: boolean;
  withTimer: boolean;

  isActiveLevelLocked = true;
  levelLockSubscription;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private activeLevelsService: ActiveTrainingRunLevelsService,
    private levelGetter: LevelGetterService,
    private trainingRunGetter: TrainingRunGetterService,
    private trainingInstanceGetter: TrainingInstanceGetterService) {
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

  nextLevel() {
    if (!this.isActiveLevelLocked) {
      this.trainingRun.currentLevel++;
      this.selectedStep += 1;
      this.activeLevelsService.nextLevel();
      this.router.navigate(['level', this.selectedStep + 1], {relativeTo: this.activeRoute.parent});
    }
  }

  showResults() {
    this.router.navigate(['results'], {relativeTo: this.activeRoute.parent});
  }

  stepClick(event) {
    if (!this.isActiveLevelLocked) {
      this.selectedStep = event.selectedIndex;
      this.trainingRun.currentLevel = this.selectedStep;
      this.activeLevelsService.setActiveLevel(this.selectedStep);
      this.router.navigate(['level', this.selectedStep + 1], {relativeTo: this.activeRoute.parent});
    }
  }

  private initDataFromUrl() {
    const id = +this.activeRoute.snapshot.paramMap.get('id');
    if (id && !Number.isNaN(id)) {
      this.trainingRunGetter.getTrainingRunById(id)
        .subscribe(trainingRun => {
          this.trainingRun = trainingRun;
          this.trainingInstanceGetter.getTrainingInstanceById(trainingRun.trainingInstanceId)
            .subscribe(trainingInstance => {
              this.trainingInstance = trainingInstance;
              this.levelGetter.getLevelsByTrainingDefId(trainingInstance.id)
                .subscribe(levels => {
                  this.levels = levels;
                  this.activeLevelsService.setActiveLevels(this.levels);
                  this.findInitialLevel();
                })
            })
        })
    }
  }

  private findInitialLevel() {
    const initialLevel = +this.activeRoute.snapshot.paramMap.get('order');
    if (initialLevel && !Number.isNaN(initialLevel)) {
      this.selectedStep = initialLevel - 1;
      this.activeLevelsService.setActiveLevel(initialLevel - 1);
    }
  }

  private subscribeLevelLockChange() {
    this.activeLevelsService.onLevelLockChanged.subscribe(
      lockChange => this.isActiveLevelLocked = lockChange
    );
  }
}

