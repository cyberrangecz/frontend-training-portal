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
/**
 * Component to display one level in a training run. Serves mainly as a wrapper which determines the type of the training
 * and displays child component accordingly
 */
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

  /**
   * Loads level from service maintaining active level
   */
  private initLevel() {
    this.level = this.activeLevelsService.getActiveLevel();
  }

  /**
   * Resolves type of a passed level
   */
  private resolveLevelType() {
    if (this.level) {
      this.isInfoLevel = this.level instanceof InfoLevel;
      this.isAssessmentLevel = this.level instanceof AssessmentLevel;
      this.isGameLevel = this.level instanceof GameLevel;
    }
  }

  /**
   * Subscribes to changes of active level. If active level is changes, it re-initializes level data and displays
   * different child component if its type is changed
   */
  private subscribeForActiveLevelChanges() {
    this.activeLevelsChangeSubscription = this.activeLevelsService.onActiveLevelChanged
      .subscribe(activeLevel => {
        this.level = activeLevel;
        this.resolveLevelType();
      })
  }
}
