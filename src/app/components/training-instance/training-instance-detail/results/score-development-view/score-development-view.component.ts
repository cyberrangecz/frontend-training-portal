import {Component, HostListener, OnInit} from '@angular/core';
import {ActiveTrainingInstanceService} from "../../../../../services/training-instance/active-training-instance.service";
import {BaseComponent} from "../../../../base.component";
import {takeWhile} from "rxjs/operators";

@Component({
  selector: 'kypo2-score-development-view',
  templateUrl: './score-development-view.component.html',
  styleUrls: ['./score-development-view.component.css'],
})
/**
 * Wrapper for score development visualization
 */
export class ScoreDevelopmentViewComponent extends BaseComponent implements OnInit {
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
