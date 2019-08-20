import {Component, OnInit} from '@angular/core';
import {ActiveTrainingInstanceService} from '../../../../services/training-instance/active-training-instance.service';
import {BaseComponent} from "../../../base.component";
import {takeWhile} from "rxjs/operators";

@Component({
  selector: 'kypo2-training-instance-progress',
  templateUrl: './training-instance-progress.component.html',
  styleUrls: ['./training-instance-progress.component.css']
})
export class TrainingInstanceProgressComponent extends BaseComponent implements OnInit {

  isLoading = true;
  trainingDefinitionId: number;
  trainingInstanceId: number;

  constructor(private activeTrainingInstanceService: ActiveTrainingInstanceService) {
    super();
  }

  ngOnInit() {
    this.subscribeForInstanceChanges();
    this.getIdsForVisualization();
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
    this.activeTrainingInstanceService.onActiveTrainingChanged
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(newInstanceId => this.getIdsForVisualization());
  }
}
