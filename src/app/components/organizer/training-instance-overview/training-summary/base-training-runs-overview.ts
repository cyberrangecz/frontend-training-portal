import {TrainingInstance} from "../../../../model/training/training-instance";
import {interval, Subscription} from "rxjs";
import { OnDestroy, OnInit} from "@angular/core";
import {ActiveTrainingInstanceService} from "../../../../services/organizer/active-training-instance.service";
import {environment} from "../../../../../environments/environment";

export abstract class BaseTrainingRunsOverview implements OnInit, OnDestroy {
  trainingInstance: TrainingInstance;

  private periodicalDataRefreshSubscription: Subscription;
  private activeTrainingSubscription: Subscription;

  protected constructor(private activeTrainingInstanceService: ActiveTrainingInstanceService) {}

  protected abstract fetchData();
  protected abstract initDataSource();

  ngOnInit(): void {
    this.loadActiveTraining();
    this.subscribeActiveTrainingChanges();
    this.initDataSource();
    this.subscribePeriodicalDataRefresh()
  }

  ngOnDestroy(): void {
    if (this.activeTrainingSubscription) {
      this.activeTrainingSubscription.unsubscribe();
    }
    if (this.periodicalDataRefreshSubscription) {
      this.periodicalDataRefreshSubscription.unsubscribe();
    }
  }

  /**
   * Subscribes to changes of active training. If active training is changes, reloads data and creates new data source
   */
  private subscribeActiveTrainingChanges() {
    this.activeTrainingSubscription = this.activeTrainingInstanceService.onActiveTrainingChanged
      .subscribe(change => {
        this.loadActiveTraining();
        this.fetchData();
      })
  }

  private subscribePeriodicalDataRefresh() {
    this.periodicalDataRefreshSubscription = interval(environment.defaultOrganizerTROverviewRefreshRate)
      .subscribe( () => {
         this.fetchData();
      }
      );
  }

  private loadActiveTraining() {
    this.trainingInstance = this.activeTrainingInstanceService.getActiveTrainingInstance();
  }
}
