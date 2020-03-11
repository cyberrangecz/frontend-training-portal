import {ChangeDetectionStrategy, Component, HostListener, OnInit,} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Kypo2AuthService} from 'kypo2-auth';
import {map, takeWhile} from 'rxjs/operators';
import {BaseComponent} from '../../base.component';
import {Observable} from 'rxjs';
import {VisualizationInfo} from '../../../model/visualizations/visualization-info';
import {TrainingRun} from '../../../model/training/training-run';
import {Kypo2TraineeModeInfo} from 'kypo2-trainings-visualization-overview-lib';

@Component({
  selector: 'kypo2-training-run-results',
  templateUrl: './training-run-results.component.html',
  styleUrls: ['./training-run-results.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Component displaying visualization of training run results
 */
export class TrainingRunResultsComponent extends BaseComponent implements OnInit {

  vizSize: {width: number, height: number};

  visualizationInfo$: Observable<VisualizationInfo>;
  traineeModeInfo$: Observable<Kypo2TraineeModeInfo>;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: Kypo2AuthService) {
    super();
}

  ngOnInit() {
    this.setVisualizationSize(window.innerWidth, innerHeight);
    this.loadVisualizationInfo();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setVisualizationSize(event.target.innerWidth, event.target.innerHeight);
  }

  /**
   * Gets asynchronous data for visualizations
   */
  loadVisualizationInfo() {
    this.visualizationInfo$ = this.activatedRoute.data
      .pipe(
        takeWhile(_ => this.isAlive),
        map(data => this.createTrainingVisualizationInfo(data.trainingRun))
      );
    this.traineeModeInfo$ = this.visualizationInfo$
      .pipe(
        map(vizInfo => {
            const traineeModeInfo = new Kypo2TraineeModeInfo();
            traineeModeInfo.trainingRunId = vizInfo.trainingRunId;
            traineeModeInfo.activeTraineeId = vizInfo.traineeId;
            return traineeModeInfo;
        })
      );
  }

  private createTrainingVisualizationInfo(trainingRun: TrainingRun): VisualizationInfo {
    const visualizationInfo = new VisualizationInfo();
    visualizationInfo.trainingDefinitionId = trainingRun.trainingDefinitionId;
    visualizationInfo.trainingInstanceId = trainingRun.trainingInstanceId;
    visualizationInfo.trainingRunId = trainingRun.id;
    visualizationInfo.traineeId = this.authService.getActiveUser().id;
    return visualizationInfo;
  }

  private setVisualizationSize(windowWidth: number, windowHeight: number) {
    const divideBy = 2;
      const width = windowWidth / divideBy;
      const height = windowHeight / divideBy;
      this.vizSize = { width: width, height: height };
  }
}
