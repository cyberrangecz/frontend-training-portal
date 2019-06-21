import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../../services/shared/alert.service';
import { AlertTypeEnum } from '../../../../model/enums/alert-type.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/shared/error-handler.service';
import { ActiveTrainingRunService } from '../../../../services/trainee/active-training-run.service';
import { TrainingRunFacade } from '../../../../services/facades/training-run-facade.service';

@Component({
  selector: 'trainee-access-training',
  templateUrl: './trainee-access-training.component.html',
  styleUrls: ['./trainee-access-training.component.css']
})
/**
 * Components where user can access active training run by inserting correct accessToken
 */
export class TraineeAccessTrainingComponent implements OnInit {

  accessTokenPrefix: string;
  accessTokenPin: string;
  isLoading: boolean;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private alertService: AlertService,
    private errorHandler: ErrorHandlerService,
    private activeTrainingRunLevelsService: ActiveTrainingRunService,
    private trainingRunFacade: TrainingRunFacade) { }

  ngOnInit() {
  }

  /**
   * Finds active training run with matching accessToken and allocates resources for the trainee.
   * If resources are allocated, navigates user to the first level of the training
   */
  access() {
    if (this.hasValidInput()) {
      this.sendRequestToAccessTrainingRun();
    }
  }

  private sendRequestToAccessTrainingRun() {
    this.isLoading = true;
    const accessToken = this.accessTokenPrefix + '-' + this.accessTokenPin;
    this.trainingRunFacade.accessTrainingRun(accessToken)
      .subscribe(trainingRunInfo => {
          this.isLoading = false;
          this.activeTrainingRunLevelsService.setUpFromTrainingRun(trainingRunInfo);
          this.router.navigate(['training/game'], { relativeTo: this.activeRoute });
        },
        err => {
          this.isLoading = false;
          this.errorHandler.displayInAlert(err, 'Connecting to training run');
        });
}

  private hasValidInput(): boolean {
    if (this.accessTokenPrefix && this.accessTokenPrefix.replace(/\s/g, '') !== ''
      && this.accessTokenPin && this.accessTokenPin.replace(/\s/g, '') !== ''
      && !isNaN(this.accessTokenPin as any) && this.accessTokenPin.length === 4) {
      return true;
    } else {
      this.alertService.emitAlert(AlertTypeEnum.Error, 'Password cannot be empty and must have correct format');
    }
  }
}
