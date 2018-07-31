import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ActiveTrainingRunLevelsService} from "../../../../services/active-training-run-levels.service";
import {AbstractLevel} from "../../../../model/level/abstract-level";
import {InfoLevel} from "../../../../model/level/info-level";
import {AssessmentLevel} from "../../../../model/level/assessment-level";
import {GameLevel} from "../../../../model/level/game-level";

@Component({
  selector: 'training-run-level',
  templateUrl: './training-run-level.component.html',
  styleUrls: ['./training-run-level.component.css']
})
export class TrainingRunLevelComponent implements OnInit, OnDestroy {

  level: AbstractLevel;
  isInfoLevel = false;
  isAssessmentLevel = false;
  isGameLevel = false;

  activeLevelsChangeSubscription;

  constructor(private activeRoute: ActivatedRoute,
              private activeLevelsService: ActiveTrainingRunLevelsService) { }

  ngOnInit() {
    this.initLevel();
    this.subscribeForActiveLevelChanges();
  }

  ngOnDestroy() {
    if (this.activeLevelsChangeSubscription) {
      this.activeLevelsChangeSubscription.unsubscribe();
    }
  }

  private initLevel() {
    this.level = this.activeLevelsService.getActiveLevel();
  }

  private resolveLevelType() {
    if (this.level) {
      this.isInfoLevel = this.level instanceof InfoLevel;
      this.isAssessmentLevel = this.level instanceof AssessmentLevel;
      this.isGameLevel = this.level instanceof GameLevel;
    }
  }

  private subscribeForActiveLevelChanges() {
    this.activeLevelsChangeSubscription = this.activeLevelsService.onActiveLevelChanged
      .subscribe(activeLevel => {
        this.level = activeLevel;
        this.resolveLevelType();
      })
  }
}
