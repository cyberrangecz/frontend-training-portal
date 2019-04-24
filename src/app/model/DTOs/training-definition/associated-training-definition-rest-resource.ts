import {TrainingDefinitionDTO} from './trainingDefinitionDTO';
import {Pagination} from '../other/pagination';
import {AssociatedTrainingDefinitionDTO} from './associated-training-definition-dto';

export interface AssociatedTrainingDefinitionRestResource {
  content?: Array<AssociatedTrainingDefinitionDTO>;
  pagination?: Pagination;
}
