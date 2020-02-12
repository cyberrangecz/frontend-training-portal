import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {AccessTrainingRunInfo} from '../../../model/training/access-training-run-info';
import {TrainingDefinition} from '../../../model/training/training-definition';
import {TrainingDefinitionApi} from '../../../services/api/training-definition-api.service';
import {RunningTrainingRunService} from '../../../services/training-run/running/running-training-run.service';
import {BaseComponent} from '../../base.component';

/**
 * Main component of training run preview. Initializes mock services with data of training definition to simulate
 * real server behaviour.
 */
@Component({
  selector: 'kypo2-designer-preview',
  templateUrl: './training-preview.component.html',
  styleUrls: ['./training-preview.component.css']
})
export class TrainingPreviewComponent extends BaseComponent implements OnInit {

  isLoaded = false;

  constructor(private previewService: RunningTrainingRunService,
              private trainingDefinitionFacade: TrainingDefinitionApi,
              private activeRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.initializeGame();
  }

  private initializeGame() {
    this.activeRoute.data
      .pipe(
        map(data => data.trainingDefinition)
      ).subscribe(training => {
        this.previewService.setUpFromTrainingRun(this.createMockTrainingRun(training));
        this.isLoaded = true;
    });
  }

  private createMockTrainingRun(training: TrainingDefinition) {
    const mockRun = new AccessTrainingRunInfo();
    mockRun.levels = training.levels;
    mockRun.isStepperDisplayed = training.showStepperBar;
    return mockRun;
  }
}
