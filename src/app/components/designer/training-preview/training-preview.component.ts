import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {TrainingDefinitionFacade} from "../../../services/facades/training-definition-facade.service";
import {ActiveTrainingRunService} from "../../../services/trainee/active-training-run.service";
import {TrainingDefinition} from "../../../model/training/training-definition";
import {AccessTrainingRunInfo} from "../../../model/training/access-training-run-info";

@Component({
  selector: 'app-designer-preview',
  templateUrl: './training-preview.component.html',
  styleUrls: ['./training-preview.component.css']
})
export class TrainingPreviewComponent implements OnInit {

  isLoaded: boolean = false;

  constructor(private previewService: ActiveTrainingRunService,
              private trainingDefinitionFacade: TrainingDefinitionFacade,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.initializeGame();
  }

  private initializeGame() {
    this.activeRoute.paramMap
      .pipe(
        switchMap(paramMap =>
          this.trainingDefinitionFacade.getTrainingDefinitionById(Number(paramMap.get('id')), true))
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
