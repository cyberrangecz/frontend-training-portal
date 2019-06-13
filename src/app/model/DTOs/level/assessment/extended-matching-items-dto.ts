import {AbstractQuestionCreateDTO, AbstractQuestionDTO} from './abstact-question-dto';
import {EmiChoiceDTO} from './emi-choice-dto';


export class ExtendedMatchingItemsDTO implements AbstractQuestionCreateDTO {
  answer_required: boolean;
  rows: string[];
  cols: string[];
  correct_answers: EmiChoiceDTO[];
  order: number;
  penalty: number;
  points: number;
  question_type: AbstractQuestionDTO.QuestionTypeEnum;
  text: string;
}
