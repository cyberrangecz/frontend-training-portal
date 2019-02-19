import {AbstractQuestionCreateDTO, AbstractQuestionDTO} from './abstactQuestionDTO';
import {EMIChoiceDTO} from './emiChoiceDTO';

export interface ExtendedMatchingItemsCreateDTO extends AbstractQuestionCreateDTO{
  choices: EMIChoiceDTO[];
}

export class ExtendedMatchingItemsDTOClass implements ExtendedMatchingItemsCreateDTO {
  answer_required: boolean;
  choices: EMIChoiceDTO[];
  order: number;
  penalty: number;
  points: number;
  question_type: AbstractQuestionDTO.QuestionTypeEnum;
  text: string;
}
