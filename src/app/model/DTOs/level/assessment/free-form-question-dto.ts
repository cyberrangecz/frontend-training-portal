import {AbstractQuestionCreateDTO, AbstractQuestionDTO} from './abstact-question-dto';

export interface FreeFormQuestionCreateDTO extends AbstractQuestionCreateDTO {
  correct_choices: string[];
}

export class FreeFormQuestionDTOClass implements FreeFormQuestionCreateDTO {
  text: string;
  question_type: AbstractQuestionDTO.QuestionTypeEnum;
  answer_required: boolean;
  order: number;
  penalty?: number;
  points?: number;
  correct_choices: string[];
}
