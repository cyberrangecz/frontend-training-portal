import {Injectable} from '@angular/core';
import {TrainingRun} from '../../model/training/training-run';
import {TrainingRunDTO} from '../../model/DTOs/training-run/trainingRunDTO';
import {LevelMapper} from './level-mapper.service';
import {TrainingRunStateEnum} from '../../model/enums/training-run-state.enum';
import {TrainingInstanceMapper} from './training-instance-mapper.service';
import {TrainingRunRestResource} from '../../model/DTOs/training-run/trainingRunRestResource';
import {AccessedTrainingRunDTO} from '../../model/DTOs/training-run/accessedTrainingRunDTO';
import {AccessedTrainingRunsTableAdapter} from '../../model/table-adapters/accessed-training-runs-table-adapter';
import {TraineeAccessTrainingRunActionEnum} from '../../model/enums/trainee-access-training-run-actions.enum';
import {PaginatedTable} from '../../model/table-adapters/paginated-table';
import {TrainingRunTableAdapter} from '../../model/table-adapters/training-run-table-adapter';
import {TablePagination} from '../../model/table-adapters/table-pagination';
import {AccessTrainingRunDTO} from '../../model/DTOs/training-run/accessTrainingRunDTO';
import {AccessTrainingRunInfo} from '../../model/training/access-training-run-info';
import {IsCorrectFlagDTO} from '../../model/DTOs/level/game/isCorrectFlagDTO';
import {FlagCheck} from '../../model/level/flag-check';
import {AbstractQuestion} from '../../model/questions/abstract-question';
import {AbstractAssessmentAnswerDTO} from '../../model/DTOs/level/assessment/abstractAssessmentAnswerDTO';
import {FreeFormAnswerDTO} from '../../model/DTOs/level/assessment/freeFormAnswerDTO';
import {FreeFormQuestion} from '../../model/questions/free-form-question';
import {MultipleChoiceQuestion} from '../../model/questions/multiple-choice-question';
import {ExtendedMatchingItems} from '../../model/questions/extended-matching-items';
import {MultipleChoiceQuestionAnswerDTO} from '../../model/DTOs/level/assessment/multipleChoiceQuestionAnswerDTO';
import {ExtendedMatchingItemsAnswerDTO} from '../../model/DTOs/level/assessment/extendedMatchingItemsAnswerDTO';
import {UserMapper} from './user.mapper.service';
import {EMIChoiceDTO} from '../../model/DTOs/level/assessment/emiChoiceDTO';
import PossibleActionEnum = AccessedTrainingRunDTO.PossibleActionEnum;

@Injectable()
export class TrainingRunMapper {

  constructor(private levelMapper: LevelMapper,
              private userMapper: UserMapper,
              private trainingInstanceMapper: TrainingInstanceMapper) {
  }

  /**
   * Maps training run DTOs retrieved from remote server to training run objects
   * @param resource training run DTOs retrieved from remote server
   */
  mapTrainingRunDTOsToTrainingRuns(resource: TrainingRunRestResource): TrainingRun[] {
    const result: TrainingRun[] = [];
    resource.content.forEach(trainingRunDTO =>
      result.push(this.mapTrainingRunDTOToTrainingRun(trainingRunDTO)));
    return result;
  }

  /**
   * Maps training run DTOs retrieved from remote server to training run objects with pagination
   * @param resource training run DTOs retrieved from remote server
   */
  mapTrainingRunDTOsToTrainingRunsWithPagination(resource: TrainingRunRestResource): PaginatedTable<TrainingRunTableAdapter[]> {
    const tableData: TrainingRunTableAdapter[] = [];
    resource.content.forEach(trainingRunDTO => {
      const tableRow = new TrainingRunTableAdapter();
      tableRow.trainingRun = this.mapTrainingRunDTOToTrainingRun(trainingRunDTO);
      tableRow.isWaitingForRevertResponse = false;
      tableData.push(tableRow);
    });

    const tablePagination = new TablePagination(resource.pagination.number,
      resource.pagination.number_of_elements,
      resource.pagination.size,
      resource.pagination.total_elements,
      resource.pagination.total_pages);
    return new PaginatedTable(tableData, tablePagination);
  }

  /**
   * Maps training run DTO retrieved from remote server to training run object
   * @param trainingRunDTO training run DTO retrieved from remote server
   */
  mapTrainingRunDTOToTrainingRun(trainingRunDTO: TrainingRunDTO): TrainingRun {
    const result = new TrainingRun();
    result.id = trainingRunDTO.id;
    result.startTime = new Date(trainingRunDTO.start_time);
    result.endTime = new Date(trainingRunDTO.end_time);
    result.eventLogReference = trainingRunDTO.event_log_reference;
    if (trainingRunDTO.sandbox_instance_ref) {
      result.sandboxInstanceId = trainingRunDTO.sandbox_instance_ref.id;
    }
    result.user = this.userMapper.mapUserRefDTOToUser(trainingRunDTO.participant_ref);
    result.state = this.mapTrainigRunDTOStateToEnum(trainingRunDTO.state);

    if (result.currentLevel) {
      result.currentLevel = this.levelMapper.mapLevelDTOToLevel(trainingRunDTO.current_level);
    }
    if (result.trainingInstance) {
      result.trainingInstance = this.trainingInstanceMapper.mapTrainingInstanceDTOToTrainingInstance(trainingRunDTO.training_instance);
    }
    return result;
  }

  mapAccessTrainingRunDTOToAccessTrainingRun(accessDTO: AccessTrainingRunDTO): AccessTrainingRunInfo {
    const result = new AccessTrainingRunInfo();
    result.trainingRunId = accessDTO.training_run_id;
    result.sandboxInstanceId = accessDTO.sandbox_instance_id;
    result.startTime = new Date(accessDTO.start_time);
    result.isStepperDisplayed = accessDTO.show_stepper_bar;
    result.currentLevel = this.levelMapper.mapLevelDTOToLevel(accessDTO.abstract_level_dto);
    result.levels = this.levelMapper.mapBasicInfoDTOsToAbstractLevels(accessDTO.info_about_levels);

    return result;
  }

  mapAccessedTrainingRunDTOsToTrainingRunTableObjects(resource: TrainingRunRestResource)
    : PaginatedTable<AccessedTrainingRunsTableAdapter[]> {
    const tableData: AccessedTrainingRunsTableAdapter[] = [];
    resource.content.forEach(accessedTrainingRunDTO =>
      tableData.push(this.mapAccessedTrainingRunDTOToTrainingRunTableObject(accessedTrainingRunDTO)));
    const tablePagination = new TablePagination(resource.pagination.number,
      resource.pagination.number_of_elements,
      resource.pagination.size,
      resource.pagination.total_elements,
      resource.pagination.total_pages);
    return new PaginatedTable(tableData, tablePagination);
  }


  mapAccessedTrainingRunDTOToTrainingRunTableObject(accessedTrainingRunDTO: AccessedTrainingRunDTO): AccessedTrainingRunsTableAdapter {
    const result = new AccessedTrainingRunsTableAdapter();
    result.currentLevel = accessedTrainingRunDTO.current_level_order;
    result.totalLevels = accessedTrainingRunDTO.number_of_levels;
    result.trainingInstanceTitle = accessedTrainingRunDTO.title;
    result.trainingRunId = accessedTrainingRunDTO.id;
    result.trainingInstanceStartTime = new Date(accessedTrainingRunDTO.training_instance_start_date);
    result.trainingInstanceEndTime = new Date(accessedTrainingRunDTO.training_instance_end_date);
    result.action = this.mapActionEnumFromDTOToTableDataModel(accessedTrainingRunDTO.possible_action);
    return result;
  }

  mapQuestionsToUserAnswerJSON(questions: AbstractQuestion[]): string {
    const result: AbstractAssessmentAnswerDTO[] = [];
    questions.forEach(question => result.push(this.mapQuestionToUserAnswerDTO(question)));
    return JSON.stringify(result);
  }

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
    result.pairs = question.usersAnswers.map(answer => new EMIChoiceDTO(answer.x, answer.y));
    return result;
  }

  /**
   *
   * @param flagResponse
   */
  mapIsCorrectFlagDTOToObject(flagResponse: IsCorrectFlagDTO): FlagCheck {
    const result = new FlagCheck();
    result.isCorrect = flagResponse.correct;
    result.remainingAttempts = flagResponse.remaining_attempts;
    return result
  }

  private mapActionEnumFromDTOToTableDataModel(action: PossibleActionEnum): TraineeAccessTrainingRunActionEnum {
    switch (action) {
      case PossibleActionEnum.RESULTS: return TraineeAccessTrainingRunActionEnum.Results;
      case null: return null;
      default: console.error('Could not map attribute "action" of "AccessedTrainingRunDTO to any known action');
    }
  }

  private mapTrainigRunDTOStateToEnum(state: TrainingRunDTO.StateEnum): TrainingRunStateEnum {
    switch (state) {
      case TrainingRunDTO.StateEnum.ALLOCATED: return TrainingRunStateEnum.Allocated;
      case TrainingRunDTO.StateEnum.NEW: return TrainingRunStateEnum.New;
      case TrainingRunDTO.StateEnum.READY: return TrainingRunStateEnum.Ready;
      case TrainingRunDTO.StateEnum.FINISHED: return TrainingRunStateEnum.Finished;
      default: {
        console.error('Could not map training run state to enum');
        return null;
      }
    }
  }
}
