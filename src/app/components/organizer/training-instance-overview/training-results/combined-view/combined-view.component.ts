import { Component, OnInit } from '@angular/core';

import {ActiveTrainingInstanceService} from "../../../../../services/organizer/active-training-instance.service";
import {Subscription} from "rxjs";
import {BaseComponent} from "../../../../base.component";
import {takeWhile} from "rxjs/operators";

@Component({
  selector: 'combined-view',
  templateUrl: './combined-view.component.html',
  styleUrls: ['./combined-view.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class CombinedViewComponent extends BaseComponent implements OnInit {
  isLoading = true;
  trainingDefinitionId: number;
  trainingInstanceId: number;
  vizSize: {width: number, height: number};

  constructor(private activeTrainingInstanceService: ActiveTrainingInstanceService) {
    super();
  }

  ngOnInit() {
    this.setVisualizationSize(window.innerWidth, innerHeight);
    this.subscribeForInstanceChanges();
    this.getIdsForVisualization();
  }

  onResize(event) {
    this.setVisualizationSize(event.target.innerWidth, event.target.innerHeight);
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

  private setVisualizationSize(windowWidth: number, windowHeight: number) {
    const width = windowWidth / 2;
    const height = windowHeight / 2;
    this.vizSize = { width: width, height: height }
  }

}
