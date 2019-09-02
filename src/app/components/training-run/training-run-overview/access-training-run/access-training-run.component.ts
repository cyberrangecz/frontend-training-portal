import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertService } from '../../../../services/shared/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/shared/error-handler.service';
import { ActiveTrainingRunService } from '../../../../services/training-run/active-training-run.service';
import { TrainingRunFacade } from '../../../../services/facades/training-run-facade.service';
import {BaseComponent} from '../../../base.component';
import {takeWhile} from 'rxjs/operators';
import {TRAINING_RUN_GAME_PATH} from '../paths';
import { TraineeAccessTrainingFormGroup } from './trainee-access-training-form-group';

@Component({
  selector: 'kypo2-access-training-run',
  templateUrl: './access-training-run.component.html',
  styleUrls: ['./access-training-run.component.css']
})
/**
 * Components for trainee access to training run by inserting token
 */
export class AccessTrainingRunComponent extends BaseComponent implements OnInit {

  @ViewChild('pin', {static: false}) accessTokenPinInput: ElementRef;

  traineeAccessTrainingFormGroup: TraineeAccessTrainingFormGroup;

  isLoading: boolean;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private alertService: AlertService,
              private errorHandler: ErrorHandlerService,
              private activeTrainingRunLevelsService: ActiveTrainingRunService,
              private trainingRunFacade: TrainingRunFacade) {
    super();
  }

  ngOnInit() {
    this.traineeAccessTrainingFormGroup = new TraineeAccessTrainingFormGroup();
  }

  get accessTokenPrefix() {return this.traineeAccessTrainingFormGroup.formGroup.get('accessTokenPrefix'); }
  get accessTokenPin() {return this.traineeAccessTrainingFormGroup.formGroup.get('accessTokenPin'); }

  /**
   * Finds active training run with matching accessToken and allocates resources for the trainee.
   * If resources are allocated, navigates user to the first level of the training
   */
  access() {
    if (this.traineeAccessTrainingFormGroup.formGroup.valid) {
      this.sendRequestToAccessTrainingRun();
    }
  }

  private sendRequestToAccessTrainingRun() {
    this.isLoading = true;
    const accessToken = this.accessTokenPrefix.value + '-' + this.accessTokenPin.value;
    this.trainingRunFacade.accessTrainingRun(accessToken)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(trainingRunInfo => {
          this.isLoading = false;
          this.activeTrainingRunLevelsService.setUpFromTrainingRun(trainingRunInfo);
          this.router.navigate([trainingRunInfo.trainingRunId, TRAINING_RUN_GAME_PATH], { relativeTo: this.activeRoute });
        },
        err => {
          this.isLoading = false;
          this.errorHandler.displayInAlert(err, 'Connecting to training run');
        });
}

  onPaste(event: ClipboardEvent) {

    const pastedText = event.clipboardData.getData('text');
    if (pastedText.includes('-')) {
      event.preventDefault();
      this.accessTokenPrefix.setValue(pastedText.slice(0, pastedText.indexOf('-')));
      this.accessTokenPin.setValue(pastedText.slice(pastedText.indexOf('-') + 1, pastedText.length));
      this.traineeAccessTrainingFormGroup.formGroup.updateValueAndValidity();
      this.accessTokenPin.markAsTouched();
      this.accessTokenPrefix.markAsTouched();
    }
  }

  onKeyup(event) {
    if (event.key === '-') {
      this.accessTokenPinInput.nativeElement.focus();
      this.accessTokenPrefix.setValue(this.accessTokenPrefix.value.slice(0, -1))   ;

    }
  }

}
