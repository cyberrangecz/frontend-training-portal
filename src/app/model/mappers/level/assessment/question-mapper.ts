import {FreeFormQuestion} from '../../../questions/free-form-question';
import {ExtendedMatchingItems} from '../../../questions/extended-matching-items';
import {MultipleChoiceQuestion} from '../../../questions/multiple-choice-question';
import {AbstractAssessmentAnswerDTO} from '../../../DTOs/level/assessment/abstract-assessment-answer-dto';
import {AbstractQuestionCreateDTO} from '../../../DTOs/level/assessment/abstact-question-dto';
import {Question} from '../../../questions/question';
import {FreeFormQuestionMapper} from './free-form-question-mapper';
import {ExtendedMatchingItemsMapper} from './extended-matching-items-mapper';
import {MultipleChoiceQuestionMapper} from './multiple-choice-question-mapper';

export class QuestionMapper {

  static fromDTO(dto): Question {
    let question: Question;

    switch (dto.question_type) {
      case 'FFQ': {
        question = FreeFormQuestionMapper.fromDTO(dto);
        break;
      }
      case 'EMI': {
        question = ExtendedMatchingItemsMapper.fromDTO(dto);
        break;
      }
      case 'MCQ': {
        question = MultipleChoiceQuestionMapper.fromDTO(dto);
        break;
      }
      default: {
        console.error('Could not map question from JSON to any of known types');
        return undefined;
      }
    }

    question.required = dto.answer_required;
    question.penalty = dto.penalty;
    question.score = dto.points;
    question.order = dto.order;
    return question;
  }

  static fromDTOs(dtos): Question[] {
    return dtos.map(dto => QuestionMapper.fromDTO(dto));
  }

  static toAnswersDTO(question: Question): AbstractAssessmentAnswerDTO {
    if (question instanceof FreeFormQuestion) {
      return FreeFormQuestionMapper.toAnswersDTO(question);
    }
    if (question instanceof MultipleChoiceQuestion) {
      return MultipleChoiceQuestionMapper.toAnswersDTO(question);
    }
    if (question instanceof ExtendedMatchingItems) {
      return ExtendedMatchingItemsMapper.toAnswersDTO(question);
    }
  }

  static toAnswersDTOs(questions: Question[]): string {
    const result = questions.map(question => this.toAnswersDTO(question));
    return JSON.stringify(result);
  }

  static toCreateDTO(question: Question): AbstractQuestionCreateDTO {
    let questionDTO;
    if (question instanceof FreeFormQuestion) {
      questionDTO = FreeFormQuestionMapper.toCreateDTO(question);
    }
    if (question instanceof MultipleChoiceQuestion) {
      questionDTO = MultipleChoiceQuestionMapper.toCreateDTO(question);
    }
    if (question instanceof ExtendedMatchingItems) {
      questionDTO = ExtendedMatchingItemsMapper.toCreateDTO(question);
    }

    questionDTO.answer_required = question.required;
    questionDTO.order = question.order;
    questionDTO.penalty = question.penalty;
    questionDTO.points = question.score;
    questionDTO.text = question.title;
    return questionDTO;
  }

  static toCreateDTOs(questions: Question[]): AbstractQuestionCreateDTO[] {
    const result: AbstractQuestionCreateDTO[] = [];
    if (!questions || questions.length < 1) {
      return [];
    }
    let index = 0;
    questions.forEach(question => {
      const questionDTO = QuestionMapper.toCreateDTO(question);
      questionDTO.order = index;
      index++;
      result.push(questionDTO);
    });
    return result;
  }
}
