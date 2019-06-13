import {AbstractAssessmentAnswerDTO} from './abstract-assessment-answer-dto';

export class MultipleChoiceQuestionAnswerDTO implements AbstractAssessmentAnswerDTO {
  question_order: number;
  choices: number[];
}
