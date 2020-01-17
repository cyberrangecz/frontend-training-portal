import {FreeFormAnswerDTO} from '../../../DTOs/level/assessment/free-form-answer-dto';
import {
  FreeFormQuestionCreateDTO,
  FreeFormQuestionDTOClass
} from '../../../DTOs/level/assessment/free-form-question-dto';
import {FreeFormQuestion} from '../../../questions/free-form-question';
import {AbstractQuestionDTO} from '../../../DTOs/level/assessment/abstact-question-dto';

export class FreeFormQuestionMapper {
  static fromDTO(dto): FreeFormQuestion {
    const result = new FreeFormQuestion(dto.text);
    const answers: string[] = [];
    if (dto.correct_choices) {
      dto.correct_choices.forEach(choice => answers.push(choice));
    }
    result.correctAnswers = answers;
    return result;
  }

  static toAnswersDTO(question: FreeFormQuestion): FreeFormAnswerDTO {
    const result = new FreeFormAnswerDTO();
    result.question_order = question.order;
    if (!question.usersAnswer) {
      result.text = '';
    } else {
      result.text = question.usersAnswer;
    }
    return result;
  }

  static toCreateDTO(question: FreeFormQuestion): FreeFormQuestionCreateDTO {
    const result = new FreeFormQuestionDTOClass();
    result.question_type = AbstractQuestionDTO.QuestionTypeEnum.FFQ;
    result.correct_choices = question.correctAnswers;
    return result;
  }
}
