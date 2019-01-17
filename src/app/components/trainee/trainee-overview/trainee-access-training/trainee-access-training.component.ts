import { Component, OnInit } from '@angular/core';
import {AlertService} from "../../../../services/event-services/alert.service";
import {AlertTypeEnum} from "../../../../enums/alert-type.enum";
import {ActivatedRoute, Router} from "@angular/router";
import {ComponentErrorHandlerService} from "../../../../services/component-error-handler.service";
import {ActiveTrainingRunLevelsService} from "../../../../services/active-training-run-levels.service";
import {AbstractLevel} from "../../../../model/level/abstract-level";
import {TrainingRunFacade} from "../../../../services/facades/training-run-facade.service";

@Component({
  selector: 'trainee-access-training',
  templateUrl: './trainee-access-training.component.html',
  styleUrls: ['./trainee-access-training.component.css']
})
/**
 * Components where user can access active training run by inserting correct accessToken
 */
export class TraineeAccessTrainingComponent implements OnInit {

  accessToken: string;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private alertService: AlertService,
    private errorHandler: ComponentErrorHandlerService,
    private activeTrainingRunLevelsService: ActiveTrainingRunLevelsService,
    private trainingRunFacade: TrainingRunFacade) { }

  ngOnInit() {
  }

  /**
   * Finds active training run with matching accessToken and allocates resources for the trainee.
   * If resources are allocated, navigates user to the first level of the training
   */
  access() {
    if (this.accessToken && this.accessToken.replace(/\s/g, '') !== '') {
      this.trainingRunFacade.accessTrainingRun(this.accessToken)
        .subscribe(resp => {
          if (resp.currentLevel && resp.levels && resp.levels.length > 0) {
            this.sortReceivedLevels(resp.levels);
            this.activeTrainingRunLevelsService.trainingRunId = resp.trainingRunId;
            this.activeTrainingRunLevelsService.setActiveLevels(resp.levels.sort((a, b) => a.order - b.order));
            this.activeTrainingRunLevelsService.setActiveLevel(resp.currentLevel);
            this.router.navigate(['training/game'], {relativeTo: this.activeRoute});
          }
        },
          err=> {
          this.errorHandler.displayHttpError(err, 'Connecting to training run');
        })
    } else {
      this.alertService.emitAlert(AlertTypeEnum.Error, 'Password cannot be empty');
    }
  }

  private sortReceivedLevels(levels: AbstractLevel[]) {
    levels.sort((a, b) => a.order - b.order);
  }
}
