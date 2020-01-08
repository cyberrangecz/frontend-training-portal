import {TrainingDefinition} from '../training/training-definition';

/**
 * Event representing training definition change (edit)
 */
export class TrainingDefinitionChangeEvent {
  trainingDefinition: TrainingDefinition;
  isValid: boolean;

  constructor(trainingDefinition: TrainingDefinition, isValid: boolean) {
    this.trainingDefinition = trainingDefinition;
    this.isValid = isValid;
  }
}
