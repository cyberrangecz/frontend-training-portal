import { Component, OnInit } from '@angular/core';
import {ActiveTrainingInstanceService} from "../../../../../services/organizer/active-training-instance.service";

@Component({
  selector: 'score-scatter-plot-view',
  templateUrl: './score-scatter-plot-view.component.html',
  styleUrls: ['./score-scatter-plot-view.component.css']
})
export class ScoreScatterPlotViewComponent implements OnInit {

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
