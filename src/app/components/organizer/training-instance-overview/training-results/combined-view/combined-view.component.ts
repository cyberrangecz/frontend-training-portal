import { Component, OnInit } from '@angular/core';

import {ActiveTrainingInstanceService} from "../../../../../services/organizer/active-training-instance.service";

@Component({
  selector: 'combined-view',
  templateUrl: './combined-view.component.html',
  styleUrls: ['./combined-view.component.css']
})
export class CombinedViewComponent implements OnInit {

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
