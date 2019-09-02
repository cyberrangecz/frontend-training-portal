import {TrainingInstance} from '../../../../model/training/training-instance';
import {interval} from 'rxjs';
import {OnInit} from '@angular/core';
import {ActiveTrainingInstanceService} from '../../../../services/training-instance/active-training-instance.service';
import {environment} from '../../../../../environments/environment';
import {BaseComponent} from '../../../base.component';
import {takeWhile} from 'rxjs/operators';

/**
 * Abstract class containing common flow for tables displaying real-time training run tables for organizer
 */
export abstract class BaseTrainingRunOverview extends BaseComponent implements OnInit {
  trainingInstance: TrainingInstance;

  protected constructor(private activeTrainingInstanceService: ActiveTrainingInstanceService) {
    super();
  }

  protected abstract fetchData();
  protected abstract initDataSource();

  ngOnInit(): void {
    this.loadActiveTraining();
    this.subscribeActiveTrainingChanges();
    this.initDataSource();
    this.subscribePeriodicalDataRefresh();
  }

  /**
   * Subscribes to changes of active training. If active training is changes, reloads data and creates new data source
   */
  private subscribeActiveTrainingChanges() {
    this.activeTrainingInstanceService.onActiveTrainingChanged
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(change => {
        this.loadActiveTraining();
        this.refreshData();
      });
  }

  private subscribePeriodicalDataRefresh() {
    interval(environment.defaultOrganizerTROverviewRefreshRate)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe( () => {
        this.refreshData();
      });
  }

  private refreshData() {
    if (this.trainingInstance.hasPoolId()) {
      this.fetchData();
    }
  }
  private loadActiveTraining() {
    this.trainingInstance = this.activeTrainingInstanceService.getActiveTrainingInstance();
  }
}
