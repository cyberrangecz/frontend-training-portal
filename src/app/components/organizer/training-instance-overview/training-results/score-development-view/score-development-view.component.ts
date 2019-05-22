import { Component, OnInit } from '@angular/core';
import {ActiveTrainingInstanceService} from "../../../../../services/organizer/active-training-instance.service";

@Component({
  selector: 'score-development-view',
  templateUrl: './score-development-view.component.html',
  styleUrls: ['./score-development-view.component.css']
})
export class ScoreDevelopmentViewComponent implements OnInit {

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
