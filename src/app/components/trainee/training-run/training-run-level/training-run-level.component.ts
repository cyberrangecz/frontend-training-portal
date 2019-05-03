import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ActiveTrainingRunService} from "../../../../services/trainee/active-training-run.service";
import {AbstractLevel} from "../../../../model/level/abstract-level";
import {InfoLevel} from "../../../../model/level/info-level";
import {AssessmentLevel} from "../../../../model/level/assessment-level";
import {GameLevel} from "../../../../model/level/game-level";
import {MatDialog} from "@angular/material";

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

  constructor(
    private dialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private activeLevelsService: ActiveTrainingRunService) { }

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
   * Shows dialog asking the user if he really wants to leave the page after clicking on back button
   */
  @HostListener('window:onpopstate')
  canGoBack(): boolean {
    return confirm('WARNING: You may lose progress in the current level. Do you really want to leave?');
  }

  /**
   * Shows dialog asking the user if he really wants to leave the page after refresh or navigating to another page
   */
  @HostListener('window:beforeunload')
  canRefreshOrLeave(): boolean {
    return confirm('WARNING: You may lose progress in the current level. Do you really want to leave?');
  }

  /**
   * Loads level from service maintaining active level
   */
  private initLevel() {
    this.level = this.activeLevelsService.getActiveLevel();
    this.resolveLevelType();
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
   * Subscribes to changes of active level. If active level is changed, it re-initializes level data and displays
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
