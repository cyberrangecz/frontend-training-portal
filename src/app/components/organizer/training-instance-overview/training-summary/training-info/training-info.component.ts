import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActiveTrainingInstanceService} from "../../../../../services/active-training-instance.service";
import {TrainingInstance} from "../../../../../model/training/training-instance";
import {TrainingDefinition} from "../../../../../model/training/training-definition";
import {TrainingDefinitionGetterService} from "../../../../../services/data-getters/training-definition-getter.service";
import {User} from "../../../../../model/user/user";
import {UserGetterService} from "../../../../../services/data-getters/user-getter.service";

@Component({
  selector: 'training-info',
  templateUrl: './training-info.component.html',
  styleUrls: ['./training-info.component.css']
})
/**
 * Displays info about currently active training instance
 */
export class TrainingInfoComponent implements OnInit, OnDestroy {

  training: TrainingInstance;
  trainingDefinition: TrainingDefinition;
  organizers: User[];

  trainingChangesSubscription;

  constructor(private activeTrainingInstanceService: ActiveTrainingInstanceService,
              private userGetter: UserGetterService,
              private trainingDefinitionGetter: TrainingDefinitionGetterService) { }

  ngOnInit() {
    this.loadData();
    this.subscribeActiveTrainingChanges();
  }

  /**
   * Loads all required data from endpoints
   */
  private loadData() {
    this.training = this.activeTrainingInstanceService.getActiveTrainingInstance();
    if (this.training) {
      this.trainingDefinitionGetter.getTrainingDefinitionById(this.training.trainingDefinitionId)
        .subscribe(trainingDef => this.trainingDefinition = trainingDef);
      this.userGetter.loadUsersByIds(this.training.organizersIds)
        .subscribe(organizers => this.organizers = organizers);
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
