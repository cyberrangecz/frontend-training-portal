import {AbstractQuestionCreateDTO, AbstractQuestionDTO} from './abstactQuestionDTO';
import {MCQChoiceDTO} from './mcqChoiceDTO';

export interface MultipleChoiceQuestionCreateDTO extends AbstractQuestionCreateDTO {
  choices: MCQChoiceDTO[];
}

export class MultipleChoiceQuestionCreateDTOClass implements MultipleChoiceQuestionCreateDTO {
  answer_required: boolean;
  choices: MCQChoiceDTO[];
  order: number;
  penalty: number;
  points: number;
  question_type: AbstractQuestionDTO.QuestionTypeEnum;
  text: string;

}
