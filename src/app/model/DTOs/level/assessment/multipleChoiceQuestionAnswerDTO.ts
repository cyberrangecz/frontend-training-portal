import {AbstractAssessmentAnswerDTO} from './abstractAssessmentAnswerDTO';

export class MultipleChoiceQuestionAnswerDTO implements AbstractAssessmentAnswerDTO {
  question_order: number;
  choices: number[];
}
