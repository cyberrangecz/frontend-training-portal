import {ExtendedMatchingItemsAnswerDTO} from '../../../DTOs/level/assessment/extended-matching-items-answer-dto';
import {EmiChoiceDTO} from '../../../DTOs/level/assessment/emi-choice-dto';
import {ExtendedMatchingItemsDTO} from '../../../DTOs/level/assessment/extended-matching-items-dto';
import {AbstractQuestionDTO} from '../../../DTOs/level/assessment/abstact-question-dto';
import {ExtendedMatchingItems} from '../../../questions/extended-matching-items';

export class ExtendedMatchingItemsMapper {

  static fromDTO(dto): ExtendedMatchingItems {
    const result = new ExtendedMatchingItems(dto.text);
    result.cols = dto.cols;
    result.rows = dto.rows;
    if (dto.answer_required) {
      result.correctAnswers = dto.answer_required.map(answerDTO =>  {
        return  {
          x : answerDTO.x,
          y: answerDTO.y
        };
      });
    }
    return result;
  }

  static toAnswersDTO(question: ExtendedMatchingItems): ExtendedMatchingItemsAnswerDTO {
    const result = new ExtendedMatchingItemsAnswerDTO();
    result.question_order = question.order;
    result.pairs = question.usersAnswers.map(answer => new EmiChoiceDTO(answer.x, answer.y));
    return result;
  }

  static toCreateDTO(question: ExtendedMatchingItems): ExtendedMatchingItemsDTO {
    const questionDTO = new ExtendedMatchingItemsDTO();
    questionDTO.question_type = AbstractQuestionDTO.QuestionTypeEnum.EMI;
    questionDTO.rows = question.rows;
    questionDTO.cols = question.cols;

    if (question.required) {
      questionDTO.correct_answers = question.correctAnswers.map(answer => new EmiChoiceDTO(answer.x, answer.y));
    } else {
      questionDTO.correct_answers = [new EmiChoiceDTO(-1, -1)];
    }
    return questionDTO;
  }
}
