import { Component, OnInit } from '@angular/core';

import {ActiveTrainingInstanceService} from "../../../../../services/organizer/active-training-instance.service";

@Component({
  selector: 'combined-view',
  templateUrl: './combined-view.component.html',
  styleUrls: ['./combined-view.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class CombinedViewComponent implements OnInit {

  trainingDefinitionId: number;
  trainingInstanceId: number;
  vizSize: {width: number, height: number};

  constructor(private activeTrainingInstanceService: ActiveTrainingInstanceService) {
  }

  ngOnInit() {
    this.setVisualizationSize(window.innerWidth, innerHeight);
    const activeTrainingInstance = this.activeTrainingInstanceService.getActiveTrainingInstance();
    this.trainingInstanceId = activeTrainingInstance.id;
    this.trainingDefinitionId = activeTrainingInstance.trainingDefinition.id;
  }

  onResize(event) {
    this.setVisualizationSize(event.target.innerWidth, event.target.innerHeight);
  }

  private setVisualizationSize(windowWidth: number, windowHeight: number) {
    const width = windowWidth / 2;
    const height = windowHeight / 2;
    this.vizSize = { width: width, height: height }
  }

}
