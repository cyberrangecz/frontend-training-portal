import {TrainingDefinitionStateEnum} from '../enums/training-definition-state.enum';
import {DisplayableResource} from './displayable-resource';

export class TrainingDefinitionInfo implements DisplayableResource {
  id: number;
  title: string;
  state: TrainingDefinitionStateEnum;
}
