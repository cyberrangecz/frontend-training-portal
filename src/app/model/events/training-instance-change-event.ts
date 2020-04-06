import {TrainingInstance} from 'kypo-training-model';

/**
 * Event representing training instance change (edit)
 */
export class TrainingInstanceChangeEvent {
  trainingInstance: TrainingInstance;
  isValid: boolean;

  constructor(trainingInstance: TrainingInstance, isValid: boolean) {
    this.trainingInstance = trainingInstance;
    this.isValid = isValid;
  }
}
