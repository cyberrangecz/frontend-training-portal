import {AbstractAssessmentAnswerDTO} from './abstractAssessmentAnswerDTO';
import {EMIChoiceDTO} from './emiChoiceDTO';

export class ExtendedMatchingItemsAnswerDTO implements AbstractAssessmentAnswerDTO {
  question_order: number;
  pairs: EMIChoiceDTO[];
}
