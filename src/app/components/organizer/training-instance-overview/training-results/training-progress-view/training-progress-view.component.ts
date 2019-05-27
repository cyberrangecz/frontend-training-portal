import { Component, OnInit } from '@angular/core';
import {ActiveTrainingInstanceService} from "../../../../../services/organizer/active-training-instance.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'training-progress-view',
  templateUrl: './training-progress-view.component.html',
  styleUrls: ['./training-progress-view.component.css']
})
export class TrainingProgressViewComponent implements OnInit {
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
