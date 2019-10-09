import {Paginated} from '../other/paginated';
import {TrainingDefinitionDTO} from './training-definition-dto';
import {TrainingDefinitionInfoDTO} from './training-definition-info-dto';

export interface TrainingDefinitionInfoRestResource {
  content?: Array<TrainingDefinitionInfoDTO>;
  pagination?: Paginated;
}
