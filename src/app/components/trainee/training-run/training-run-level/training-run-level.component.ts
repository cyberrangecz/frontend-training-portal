import {Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ActiveTrainingRunService} from "../../../../services/active-training-run.service";
import {AbstractLevel} from "../../../../model/level/abstract-level";
import {InfoLevel} from "../../../../model/level/info-level";
import {AssessmentLevel} from "../../../../model/level/assessment-level";
import {GameLevel} from "../../../../model/level/game-level";
import {TrainingRunAssessmentLevelComponent} from "./training-run-assessment-level/training-run-assessment-level.component";
import {MatDialog} from "@angular/material";
import {Observable} from 'rxjs';

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

  @ViewChild(TrainingRunAssessmentLevelComponent) assessmentLevelChild: TrainingRunAssessmentLevelComponent;

  @Output('nextLevel') nextLevel: EventEmitter<number> = new EventEmitter<number>();
  @Output('displayNextLevelButton') displayNextLevelButton: EventEmitter<boolean> = new EventEmitter<boolean>();

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
   * Submits all user input data to REST
   */
  submit(): Observable<any> {
    if (this.isAssessmentLevel) {
      return this.assessmentLevelChild.submit();
    }
  }

  /**
   * Loads level from service maintaining active level
   */
  private initLevel() {
    this.level = this.activeLevelsService.getActiveLevel();
    this.resolveLevelType();
    this.setDisplayNextButtonValue();
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
   * Decides whether next level button in training page should be displayed or not (game level)
   */
  private setDisplayNextButtonValue() {
    if (this.isGameLevel) {
      this.displayNextLevelButton.emit(false);
    } else {
      this.displayNextLevelButton.emit(true);
    }
  }

  /**
   * Catches next level event from sub component and passes it to to parent
   */
  private moveToNextLevel() {
     this.nextLevel.emit();
  }
;
  /**
   * Subscribes to changes of active level. If active level is changed, it re-initializes level data and displays
   * different child component if its type is changed
   */
  private subscribeForActiveLevelChanges() {
    this.activeLevelsChangeSubscription = this.activeLevelsService.onActiveLevelChanged
      .subscribe(activeLevel => {
        this.level = activeLevel;
        this.resolveLevelType();
        this.setDisplayNextButtonValue();
      })
  }
}
