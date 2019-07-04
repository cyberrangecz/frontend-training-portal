import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ActiveTrainingRunService} from "../../../../services/trainee/active-training-run.service";
import {AbstractLevel} from "../../../../model/level/abstract-level";
import { MatDialog } from "@angular/material/dialog";
import {AbstractLevelTypeEnum} from "../../../../model/enums/abstract-level-type.enum";

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
  activeLevelsChangeSubscription;
  levelTypes = AbstractLevelTypeEnum;

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
  }

  /**
   * Subscribes to changes of active level. If active level is changed, it re-initializes level data and displays
   * different child component if its type is changed
   */
  private subscribeForActiveLevelChanges() {
    this.activeLevelsChangeSubscription = this.activeLevelsService.onActiveLevelChanged
      .subscribe(activeLevel => {
        this.level = activeLevel;
      })
  }
}
