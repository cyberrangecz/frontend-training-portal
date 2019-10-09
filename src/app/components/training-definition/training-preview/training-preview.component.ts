import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap, takeWhile} from 'rxjs/operators';
import {AccessTrainingRunInfo} from '../../../model/training/access-training-run-info';
import {TrainingDefinition} from '../../../model/training/training-definition';
import {TrainingDefinitionFacade} from '../../../services/facades/training-definition-facade.service';
import {ActiveTrainingRunService} from '../../../services/training-run/active-training-run.service';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'kypo2-designer-preview',
  templateUrl: './training-preview.component.html',
  styleUrls: ['./training-preview.component.css']
})
/**
 * Main component of traning run preview. Initializes mock services with data of training definition to simulate
 * real backend behaviour.
 */
export class TrainingPreviewComponent extends BaseComponent implements OnInit {

  isLoaded = false;

  constructor(private previewService: ActiveTrainingRunService,
              private trainingDefinitionFacade: TrainingDefinitionFacade,
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
