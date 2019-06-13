import {TrainingDefinitionDTO} from './training-definition-dto';
import {Pagination} from '../other/pagination';
import {TrainingDefinitionInfoDTO} from './training-definition-info-dto';

export interface TrainingDefinitionInfoRestResource {
  content?: Array<TrainingDefinitionInfoDTO>;
  pagination?: Pagination;
}
