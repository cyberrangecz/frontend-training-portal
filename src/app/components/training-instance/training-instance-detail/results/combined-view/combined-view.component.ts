import {Component, HostListener, OnInit} from '@angular/core';

import {takeWhile} from 'rxjs/operators';
import {ActiveTrainingInstanceService} from '../../../../../services/training-instance/active-training-instance.service';
import {BaseComponent} from '../../../../base.component';
import {DIVIDE_BY} from '../traning-instance-results.constants';

@Component({
  selector: 'kypo2-combined-view',
  templateUrl: './combined-view.component.html',
  styleUrls: ['./combined-view.component.css'],
})
/**
 * Wrapper for visualizations of training run
 */
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

  @HostListener('window:resize')
  onResize(event) {
    this.setVisualizationSize(event.target.innerWidth, event.target.innerHeight);
  }

  private getIdsForVisualization() {
    const activeTrainingInstance = this.activeTrainingInstanceService.get();
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
    const width = windowWidth / DIVIDE_BY;
    const height = windowHeight / DIVIDE_BY;
    this.vizSize = { width: width, height: height };
  }

}
