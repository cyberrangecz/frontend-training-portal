import {TrainingDefinition} from '../training/training-definition';
import {TableAdapter} from './table-adapter';
import {TrainingDefinitionStateEnum} from '../enums/training-definition-state.enum';

export class TrainingDefinitionTableAdapter implements TableAdapter {
  trainingDefinition: TrainingDefinition;
  possibleStates: string[];
  selectedState: TrainingDefinitionStateEnum;
  isLoadingStateChange: boolean;

  createPossibleStates() {
    this.possibleStates = Object.values(TrainingDefinitionStateEnum);
    if (this.selectedState === TrainingDefinitionStateEnum.Unreleased) {
     this.possibleStates = this.possibleStates.filter(state => state !== TrainingDefinitionStateEnum.Archived);
    }
    if (this.selectedState === TrainingDefinitionStateEnum.Archived) {
      this.possibleStates = this.possibleStates.filter(state => state == TrainingDefinitionStateEnum.Archived)
    }
  }
}
