import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, takeWhile} from 'rxjs/operators';
import {AccessTrainingRunInfo} from 'kypo-training-model';
import {TrainingDefinition} from 'kypo-training-model';
import {TrainingDefinitionApi} from 'kypo-training-api';
import {KypoBaseComponent} from 'kypo-common';
import {RunningTrainingRunService} from '../../../services/training-run/running/running-training-run.service';

/**
 * Main component of training run preview. Initializes mock services with data of training definition to simulate
 * real server behaviour.
 */
@Component({
  selector: 'kypo2-designer-preview',
  templateUrl: './training-preview.component.html',
  styleUrls: ['./training-preview.component.css']
})
export class TrainingPreviewComponent extends KypoBaseComponent implements OnInit {

  constructor(private previewService: RunningTrainingRunService,
              private api: TrainingDefinitionApi,
              private activeRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.initializeGame();
  }

  private initializeGame() {
    this.activeRoute.data
      .pipe(
        takeWhile(_ => this.isAlive),
        map(data => data.trainingDefinition)
      ).subscribe(training => {
        this.previewService.init(this.createMockTrainingRun(training));
    });
  }

  private createMockTrainingRun(training: TrainingDefinition) {
    const mockRun = new AccessTrainingRunInfo();
    mockRun.levels = training.levels;
    mockRun.isStepperDisplayed = training.showStepperBar;
    return mockRun;
  }
}
