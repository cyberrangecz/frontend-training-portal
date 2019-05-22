import { Component, OnInit } from '@angular/core';
import {ActiveTrainingInstanceService} from '../../../../services/organizer/active-training-instance.service';

@Component({
  selector: 'training-progress',
  templateUrl: './training-progress.component.html',
  styleUrls: ['./training-progress.component.css']
})
export class TrainingProgressComponent implements OnInit {

  trainingDefinitionId: number;
  trainingInstanceId: number;

  constructor(private activeTrainingInstanceService: ActiveTrainingInstanceService) {
  }

  ngOnInit() {
    const activeTrainingInstance = this.activeTrainingInstanceService.getActiveTrainingInstance();
    this.trainingInstanceId = activeTrainingInstance.id;
    this.trainingDefinitionId = activeTrainingInstance.trainingDefinition.id;
  }

}
