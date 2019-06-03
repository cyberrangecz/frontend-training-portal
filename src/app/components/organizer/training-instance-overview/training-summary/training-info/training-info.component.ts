import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActiveTrainingInstanceService} from "../../../../../services/organizer/active-training-instance.service";
import {TrainingInstance} from "../../../../../model/training/training-instance";
import {TrainingDefinition} from "../../../../../model/training/training-definition";

@Component({
  selector: 'training-info',
  templateUrl: './training-info.component.html',
  styleUrls: ['./training-info.component.css']
})
/**
 * Displays info about currently active training instance
 */
export class TrainingInfoComponent implements OnInit, OnDestroy {

  trainingInstance: TrainingInstance;
  trainingDefinition: TrainingDefinition;

  trainingChangesSubscription;

  constructor(private activeTrainingInstanceService: ActiveTrainingInstanceService) { }

  ngOnInit() {
    this.loadData();
    this.subscribeActiveTrainingChanges();
  }

  /**
   * Loads all required data from endpoints
   */
  private loadData() {
    this.trainingInstance = this.activeTrainingInstanceService.getActiveTrainingInstance();
    if (this.trainingInstance) {
      this.trainingDefinition = this.trainingInstance.trainingDefinition;
    }
  }

  /**
   * Subscribes to changes of active training, reloads data if active training is changed
   */
  private subscribeActiveTrainingChanges() {
    this.trainingChangesSubscription = this.activeTrainingInstanceService.onActiveTrainingChanged
      .subscribe(change => this.loadData());
  }

  ngOnDestroy() {
    if (this.trainingChangesSubscription) {
      this.trainingChangesSubscription.unsubscribe();
    }
  }
}
