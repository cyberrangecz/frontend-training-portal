import {AbstractAssessmentAnswerDTO} from './abstract-assessment-answer-dto';
import {EmiChoiceDTO} from './emi-choice-dto';

export class ExtendedMatchingItemsAnswerDTO implements AbstractAssessmentAnswerDTO {
  question_order: number;
  pairs: EmiChoiceDTO[];
}
