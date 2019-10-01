import {TrainingInstance} from '../training/training-instance';

export class TrainingInstanceChangeEvent {
  trainingInstance: TrainingInstance;
  isValid: boolean;

  constructor(trainingInstance: TrainingInstance, isValid: boolean) {
    this.trainingInstance = trainingInstance;
    this.isValid = isValid;
  }
}
