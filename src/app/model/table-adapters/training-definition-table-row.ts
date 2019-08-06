import {TrainingDefinition} from '../training/training-definition';
import {TableRowAdapter} from './table-row-adapter';
import {TrainingDefinitionStateEnum} from '../enums/training-definition-state.enum';

export class TrainingDefinitionTableRow implements TableRowAdapter {
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
