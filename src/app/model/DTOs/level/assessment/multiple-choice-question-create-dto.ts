import {AbstractQuestionCreateDTO, AbstractQuestionDTO} from './abstact-question-dto';
import {mcqDTO} from './mcq-choice-dto';

export interface MultipleChoiceQuestionCreateDTO extends AbstractQuestionCreateDTO {
  choices: mcqDTO[];
}

export class MultipleChoiceQuestionCreateDTOClass implements MultipleChoiceQuestionCreateDTO {
  answer_required: boolean;
  choices: mcqDTO[];
  order: number;
  penalty: number;
  points: number;
  question_type: AbstractQuestionDTO.QuestionTypeEnum;
  text: string;

}
