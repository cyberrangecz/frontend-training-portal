import {AbstractAssessmentAnswerDTO} from './abstractAssessmentAnswerDTO';

export class FreeFormAnswerDTO implements AbstractAssessmentAnswerDTO {
  question_order: number;
  text: string;
}
