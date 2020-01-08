import {TrainingDefinitionStateEnum} from '../enums/training-definition-state.enum';
import {DisplayableResource} from './displayable-resource';

/**
 * Class containing basic info about training definition
 */
export class TrainingDefinitionInfo implements DisplayableResource {
  id: number;
  title: string;
  state: TrainingDefinitionStateEnum;
}
