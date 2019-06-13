import {AbstractAssessmentAnswerDTO} from './abstract-assessment-answer-dto';

export class FreeFormAnswerDTO implements AbstractAssessmentAnswerDTO {
  question_order: number;
  text: string;
}
