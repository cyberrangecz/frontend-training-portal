import {TrainingDefinitionDTO} from './trainingDefinitionDTO';
import {Pagination} from '../other/pagination';
import {TrainingDefinitionInfoDTO} from './training-definition-info-d-t-o';

export interface TrainingDefinitionInfoRestResource {
  content?: Array<TrainingDefinitionInfoDTO>;
  pagination?: Pagination;
}
