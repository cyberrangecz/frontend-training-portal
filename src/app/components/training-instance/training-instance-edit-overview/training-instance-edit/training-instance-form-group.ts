import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {TrainingInstance} from '../../../../model/training/training-instance';

/**
 * Training instance edit form group control
 */
export class TrainingInstanceFormGroup {

  formGroup: FormGroup;

  constructor(trainingInstance: TrainingInstance) {
      const maxPoolSize = 64;
      this.formGroup = new FormGroup({
          'startTime': new FormControl(trainingInstance.startTime, [Validators.required, this.dateValidator]),
          'endTime': new FormControl(trainingInstance.endTime, [Validators.required, this.dateValidator]),
          'title': new FormControl(trainingInstance.title, [Validators.required]),
          'poolSize': new FormControl(trainingInstance.poolSize, [Validators.required, Validators.min(1), Validators.max(maxPoolSize)]),
          'trainingDefinition': new FormControl(trainingInstance.trainingDefinition, [Validators.required]),
          'accessToken': new FormControl(trainingInstance.accessToken, [Validators.required]),
      },  { validators: this.dateSequenceValidator });
  }

  private dateSequenceValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    let error = null;
    const startTime = control.get('startTime').value;
    const endTime = control.get('endTime').value;
    if (startTime && endTime && startTime.valueOf() > endTime.valueOf()) {
      error = { startTimeAfterEndTime: true };
    }
    return error ? error : null;
  }

  private dateValidator: ValidatorFn = (control: FormControl): ValidationErrors | null => {
    let error = null;
    if (control.value && control.value.valueOf() < Date.now()) {
      error = { dateInPast: true };
    }

    return error ? error : null;
  }

  /**
   * Sets values from training instance to individual inputs
   * @param trainingInstance training instance which values should be set to inputs
   */
  setValuesToTrainingInstance(trainingInstance: TrainingInstance) {
    trainingInstance.startTime = this.formGroup.get('startTime').value;
    trainingInstance.endTime = this.formGroup.get('endTime').value;
    trainingInstance.title = this.formGroup.get('title').value;
    trainingInstance.poolSize = this.formGroup.get('poolSize').value;
    trainingInstance.trainingDefinition = this.formGroup.get('trainingDefinition').value;
    trainingInstance.accessToken = this.formGroup.get('accessToken').value;
  }
}


