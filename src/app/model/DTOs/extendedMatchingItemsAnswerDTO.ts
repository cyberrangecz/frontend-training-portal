import {AbstractAssessmentAnswerDTO} from './abstractAssessmentAnswerDTO';

export class ExtendedMatchingItemsAnswerDTO implements AbstractAssessmentAnswerDTO {
  question_order: number;
  pairs: number[][];
}
