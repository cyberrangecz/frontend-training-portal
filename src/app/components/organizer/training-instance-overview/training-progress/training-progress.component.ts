import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActiveTrainingInstanceService} from '../../../../services/organizer/active-training-instance.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'training-progress',
  templateUrl: './training-progress.component.html',
  styleUrls: ['./training-progress.component.css']
})
export class TrainingProgressComponent implements OnInit, OnDestroy {

  isLoading = true;
  trainingDefinitionId: number;
  trainingInstanceId: number;

  instanceSubscription: Subscription;

  constructor(private activeTrainingInstanceService: ActiveTrainingInstanceService) {
  }

  ngOnInit() {
    this.subscribeForInstanceChanges();
    this.getIdsForVisualization();
  }

  ngOnDestroy(): void {
    if (this.instanceSubscription) {
      this.instanceSubscription.unsubscribe();
    }
  }

  private getIdsForVisualization() {
    const activeTrainingInstance = this.activeTrainingInstanceService.getActiveTrainingInstance();
    if (activeTrainingInstance) {
      this.trainingInstanceId = activeTrainingInstance.id;
      this.trainingDefinitionId = activeTrainingInstance.trainingDefinition.id;
      this.isLoading = false;
    }
  }

  private subscribeForInstanceChanges() {
    this.instanceSubscription = this.activeTrainingInstanceService.onActiveTrainingChanged
      .subscribe(newInstanceId => this.getIdsForVisualization());
  }
}
