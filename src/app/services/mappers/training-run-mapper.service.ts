import {Injectable} from '@angular/core';
import {User} from 'kypo2-auth';
import {AbstractAssessmentAnswerDTO} from '../../model/DTOs/level/assessment/abstract-assessment-answer-dto';
import {EmiChoiceDTO} from '../../model/DTOs/level/assessment/emi-choice-dto';
import {ExtendedMatchingItemsAnswerDTO} from '../../model/DTOs/level/assessment/extended-matching-items-answer-dto';
import {FreeFormAnswerDTO} from '../../model/DTOs/level/assessment/free-form-answer-dto';
import {MultipleChoiceQuestionAnswerDTO} from '../../model/DTOs/level/assessment/multiple-choice-question-answer-dto';
import {BasicLevelInfoDTO} from '../../model/DTOs/level/basic-level-info-dto';
import {IsCorrectFlagDTO} from '../../model/DTOs/level/game/is-correct-flag-dto';
import {AccessTrainingRunDTO} from '../../model/DTOs/training-run/access-training-run-dto';
import {AccessedTrainingRunDTO} from '../../model/DTOs/training-run/accessed-training-run-dto';
import {TrainingRunDTO} from '../../model/DTOs/training-run/training-run-dto';
import {TrainingRunRestResource} from '../../model/DTOs/training-run/training-run-rest-resource';
import {TrainingRunStateEnum} from '../../model/enums/training-run-state.enum';
import {FlagCheck} from '../../model/level/flag-check';
import LevelTypeEnum = BasicLevelInfoDTO.LevelTypeEnum;
import {GameLevel} from '../../model/level/game-level';
import {AbstractQuestion} from '../../model/questions/abstract-question';
import {ExtendedMatchingItems} from '../../model/questions/extended-matching-items';
import {FreeFormQuestion} from '../../model/questions/free-form-question';
import {MultipleChoiceQuestion} from '../../model/questions/multiple-choice-question';
import {AccessedTrainingRun} from '../../model/table/row/accessed-training-run';
import {Kypo2Pagination} from '../../model/table/other/kypo2-pagination';
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {TrainingRunTableRow} from '../../model/table/row/training-run-table-row';
import {AccessTrainingRunInfo} from '../../model/training/access-training-run-info';
import {TrainingRun} from '../../model/training/training-run';
import {LevelMapper} from './level-mapper.service';
import {TraineeAccessTrainingRunActionEnum} from '../../model/enums/trainee-access-training-run-actions.enum';
import PossibleActionEnum = AccessedTrainingRunDTO.PossibleActionEnum;

@Injectable()
/**
 *  Maps DTOs to training run internal model
 */
export class TrainingRunMapper {

  constructor(private levelMapper: LevelMapper) {
  }

  /**
   * Maps paginated training run DTOs on training run objects with pagination
   * @param resource dto to be mapped on internal model
   */
  mapTrainingRunDTOsToTrainingRuns(resource: TrainingRunRestResource): PaginatedResource<TrainingRunTableRow[]> {
    const tableData: TrainingRunTableRow[] = [];
    resource.content.forEach(trainingRunDTO => {
      const tableRow = new TrainingRunTableRow();
      tableRow.trainingRun = this.mapTrainingRunDTOToTrainingRun(trainingRunDTO);
      tableData.push(tableRow);
    });

    const tablePagination = new Kypo2Pagination(resource.pagination.number,
      resource.pagination.number_of_elements,
      resource.pagination.size,
      resource.pagination.total_elements,
      resource.pagination.total_pages);
    return new PaginatedResource(tableData, tablePagination);
  }

  /**
   * Maps training run DTO ron training run object
   * @param trainingRunDTO dto to be mapped on internal model
   */
  mapTrainingRunDTOToTrainingRun(trainingRunDTO: TrainingRunDTO): TrainingRun {
    const result = new TrainingRun();
    result.id = trainingRunDTO.id;
    result.trainingDefinitionId = trainingRunDTO.definition_id;
    result.trainingInstanceId = trainingRunDTO.instance_id;
    result.startTime = new Date(trainingRunDTO.start_time);
    result.endTime = new Date(trainingRunDTO.end_time);
    result.eventLogReference = trainingRunDTO.event_log_reference;
    result.sandboxInstanceId = trainingRunDTO.sandbox_instance_ref_id;


    result.player = User.fromDTO(trainingRunDTO.participant_ref);
    result.state = this.mapTrainigRunDTOStateToEnum(trainingRunDTO.state);

    if (result.currentLevel) {
      result.currentLevel = this.levelMapper.mapLevelDTOToLevel(trainingRunDTO.current_level);
    }
    return result;
  }

  /**
   * Maps access training run dto on internal model
   * @param accessDTO dto to be mapped on internal model
   */
  mapAccessTrainingRunDTOToAccessTrainingRun(accessDTO: AccessTrainingRunDTO): AccessTrainingRunInfo {
    const result = new AccessTrainingRunInfo();
    result.trainingRunId = accessDTO.training_run_id;
    result.sandboxInstanceId = accessDTO.sandbox_instance_ref_id;
    result.startTime = new Date(accessDTO.start_time);
    result.isStepperDisplayed = accessDTO.show_stepper_bar;
    result.currentLevel = this.levelMapper.mapLevelDTOToLevel(accessDTO.abstract_level_dto);
    result.levels = this.levelMapper.mapBasicInfoDTOsToAbstractLevels(accessDTO.info_about_levels);

    if (accessDTO.taken_solution && accessDTO.abstract_level_dto.level_type === LevelTypeEnum.GAME) {
      (result.currentLevel as GameLevel).solution = accessDTO.taken_solution;
    }
    if (accessDTO.taken_hints && accessDTO.taken_hints.length > 0  && accessDTO.abstract_level_dto.level_type === LevelTypeEnum.GAME) {
      accessDTO.taken_hints.forEach(takenHint =>  {
        const matchingHint = (result.currentLevel as GameLevel).hints.find(hint => hint.id === takenHint.id);
        if (matchingHint) {
          matchingHint.content = takenHint.content;
        }
      });
    }
    return result;
  }

  /**
   * Maps paginated accessed training run dtos on internal model
   * @param resource dto to be mapped on internal model
   */
  mapAccessedTrainingRunDTOsToAccessedTrainingRun(resource: TrainingRunRestResource)
    : PaginatedResource<AccessedTrainingRun[]> {
    const elements = resource.content.map(accessedTrainingRunDTO =>
      this.mapAccessedTrainingRunDTOToAccessedTrainingRun(accessedTrainingRunDTO));
    const pagination = new Kypo2Pagination(resource.pagination.number,
      resource.pagination.number_of_elements,
      resource.pagination.size,
      resource.pagination.total_elements,
      resource.pagination.total_pages);
    return new PaginatedResource(elements, pagination);
  }

  /**
   * Maps accessed training run dto on internal model
   * @param accessedTrainingRunDTO dto to be mapped on internal model
   */
  mapAccessedTrainingRunDTOToAccessedTrainingRun(accessedTrainingRunDTO: AccessedTrainingRunDTO): AccessedTrainingRun {
    const result = new AccessedTrainingRun();
      result.currentLevel = accessedTrainingRunDTO.current_level_order;
      result.totalLevels = accessedTrainingRunDTO.number_of_levels;
      result.completedLevels = `${result.currentLevel}/${result.totalLevels}`;
      result.trainingInstanceTitle = accessedTrainingRunDTO.title;
      result.trainingRunId = accessedTrainingRunDTO.id;
      result.trainingInstanceStartTime = new Date(accessedTrainingRunDTO.training_instance_start_date);
      result.trainingInstanceEndTime = new Date(accessedTrainingRunDTO.training_instance_end_date);
      result.trainingInstanceFormattedDuration =
        `${this.extractDate(result.trainingInstanceStartTime.toString())} -
         ${this.extractDate(result.trainingInstanceEndTime.toString())}`;
      result.action = this.getPossibleActionFromDTO(accessedTrainingRunDTO.possible_action);
    return result;
  }

  /**
   * Maps internal question objects on user answer json
   * @param questions questions to be mapped on json
   */
  mapQuestionsToUserAnswerJSON(questions: AbstractQuestion[]): string {
    const result = questions.map(question => this.mapQuestionToUserAnswerDTO(question));
    return JSON.stringify(result);
  }

  /**
   * Maps internal question object to assessment answer dto
   * @param question internal question model to be mapped on assessment answer dto
   */
  mapQuestionToUserAnswerDTO(question: AbstractQuestion): AbstractAssessmentAnswerDTO {
    if (question instanceof FreeFormQuestion) {
      return this.mapFFQToUserAnswerDTO(question);
    }
    if (question instanceof MultipleChoiceQuestion) {
      return this.mapMCQToUserAnswerDTO(question);
    }
    if (question instanceof ExtendedMatchingItems) {
      return this.mapEMIToUserAnswerDTO(question);
    }
  }

  private mapFFQToUserAnswerDTO(question: FreeFormQuestion): FreeFormAnswerDTO {
    const result = new FreeFormAnswerDTO();
    result.question_order = question.order;
    if (!question.usersAnswer) {
      result.text = '';
    } else {
      result.text = question.usersAnswer;
    }
    return result;
  }

  private mapMCQToUserAnswerDTO(question: MultipleChoiceQuestion): MultipleChoiceQuestionAnswerDTO {
    const result = new MultipleChoiceQuestionAnswerDTO();
    result.question_order = question.order;
    result.choices = question.usersAnswersIndices;
    return result;
  }

  private mapEMIToUserAnswerDTO(question: ExtendedMatchingItems): ExtendedMatchingItemsAnswerDTO {
    const result = new ExtendedMatchingItemsAnswerDTO();
    result.question_order = question.order;
    result.pairs = question.usersAnswers.map(answer => new EmiChoiceDTO(answer.x, answer.y));
    return result;
  }

  /**
   *
   * @param flagResponse
   */
  mapIsCorrectFlagDTOToFlagCheck(flagResponse: IsCorrectFlagDTO): FlagCheck {
    const result = new FlagCheck();
    result.isCorrect = flagResponse.correct;
    result.remainingAttempts = flagResponse.remaining_attempts;
    result.solution = flagResponse.solution;
    return result;
  }

  private mapTrainigRunDTOStateToEnum(state: TrainingRunDTO.StateEnum): TrainingRunStateEnum {
    switch (state) {
      case TrainingRunDTO.StateEnum.RUNNING: return TrainingRunStateEnum.RUNNING;
      case TrainingRunDTO.StateEnum.FINISHED: return TrainingRunStateEnum.FINISHED;
      case TrainingRunDTO.StateEnum.ARCHIVED: return TrainingRunStateEnum.ARCHIVED;
      default: {
        console.error('Could not map training run state to enum');
        return null;
      }
    }
  }

  private getPossibleActionFromDTO(action: PossibleActionEnum): TraineeAccessTrainingRunActionEnum {
    switch (action) {
      case PossibleActionEnum.RESULTS: return TraineeAccessTrainingRunActionEnum.Results;
      case PossibleActionEnum.RESUME: return  TraineeAccessTrainingRunActionEnum.Resume;
      case PossibleActionEnum.NONE: return TraineeAccessTrainingRunActionEnum.None;
      default: console.error('Could not map attribute "action" of "AccessedTrainingRunDTO to any known action');
    }
  }

  private extractDate(date: string): string {
    const duration = (date.match(/[a-zA-Z]{3} [0-9]{2} [0-9]{4} [0-9]{2}:[0-9]{2}/g))[0];
    const len = 2;
    return `${duration.split(' ')[1]} ${duration.split(' ')[0]} ${duration.split(' ').slice(len).join(' ')}`;
  }
}
