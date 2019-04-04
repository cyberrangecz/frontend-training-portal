import {AbstractQuestionCreateDTO, AbstractQuestionDTO} from './abstactQuestionDTO';
import {EMIChoiceDTO} from './emiChoiceDTO';


export class ExtendedMatchingItemsDTO implements AbstractQuestionCreateDTO {
  answer_required: boolean;
  rows: string[];
  cols: string[];
  correct_answers: EMIChoiceDTO[];
  order: number;
  penalty: number;
  points: number;
  question_type: AbstractQuestionDTO.QuestionTypeEnum;
  text: string;
}
