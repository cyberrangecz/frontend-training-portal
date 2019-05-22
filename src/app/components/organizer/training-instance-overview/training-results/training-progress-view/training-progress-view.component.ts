import { Component, OnInit } from '@angular/core';
import {ActiveTrainingInstanceService} from "../../../../../services/organizer/active-training-instance.service";

@Component({
  selector: 'training-progress-view',
  templateUrl: './training-progress-view.component.html',
  styleUrls: ['./training-progress-view.component.css']
})
export class TrainingProgressViewComponent implements OnInit {

  trainingDefinitionId: number;
  trainingInstanceId: number;

  constructor(private activeTrainingInstanceService: ActiveTrainingInstanceService) {
  }

  ngOnInit() {
    const activeTrainingInstance = this.activeTrainingInstanceService.getActiveTrainingInstance();
    this.trainingDefinitionId = activeTrainingInstance.trainingDefinition.id;
    this.trainingInstanceId = activeTrainingInstance.id;
  }

}
