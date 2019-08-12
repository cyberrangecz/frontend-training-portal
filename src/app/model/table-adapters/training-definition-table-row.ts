import {TrainingDefinition} from '../training/training-definition';
import {TableRowAdapter} from './table-row-adapter';
import {TrainingDefinitionStateEnum} from '../enums/training-definition-state.enum';
import {StringNormalizer} from "../utils/ignore-diacritics-filter";

export class TrainingDefinitionTableRow implements TableRowAdapter {
  trainingDefinition: TrainingDefinition;
  possibleStates: string[];
  selectedState: TrainingDefinitionStateEnum;
  isLoadingStateChange: boolean;
  normalizedTitle: string;
  normalizedState: string;


  constructor(trainingDefinition: TrainingDefinition, selectedState: TrainingDefinitionStateEnum) {
    this.trainingDefinition = trainingDefinition;
    this.selectedState = selectedState;
    this.normalizedTitle = StringNormalizer.normalizeDiacritics(this.trainingDefinition.title).toLowerCase();
    this.normalizedState = this.trainingDefinition.state.toString().toLowerCase();
    this.createPossibleStates();
  }

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
