import {Injectable} from '@angular/core';
import {TrainingRun} from '../../model/training/training-run';
import {TrainingRunDTO} from '../../model/DTOs/training-run/trainingRunDTO';
import {LevelMapper} from './level-mapper.service';
import {TrainingRunStateEnum} from '../../enums/training-run-state.enum';
import {TrainingInstanceMapper} from './training-instance-mapper.service';
import {TrainingRunRestResource} from '../../model/DTOs/training-run/trainingRunRestResource';
import {AccessedTrainingRunDTO} from "../../model/DTOs/training-run/accessedTrainingRunDTO";
import {TraineeAccessedTrainingsTableDataModel} from "../../model/table-models/trainee-accessed-trainings-table-data-model";
import {TraineeAccessTrainingRunActionEnum} from "../../enums/trainee-access-training-run-actions.enum";
import PossibleActionEnum = AccessedTrainingRunDTO.PossibleActionEnum;
import {TableDataWithPaginationWrapper} from "../../model/table-models/table-data-with-pagination-wrapper";
import {TrainingRunTableDataModel} from "../../model/table-models/training-run-table-data-model";
import {TablePagination} from "../../model/table-models/table-pagination";
import {AccessTrainingRunDTO} from "../../model/DTOs/training-run/accessTrainingRunDTO";
import {AccessTrainingRun} from "../../model/training/access-training-run";
import {IsCorrectFlagDTO} from "../../model/DTOs/level/game/isCorrectFlagDTO";
import {FlagCheck} from "../../model/level/flag-check";
import {AbstractQuestion} from '../../model/questions/abstract-question';
import {AbstractAssessmentAnswerDTO} from '../../model/DTOs/level/assessment/abstractAssessmentAnswerDTO';
import {FreeFormAnswerDTO} from '../../model/DTOs/level/assessment/freeFormAnswerDTO';
import {FreeFormQuestion} from '../../model/questions/free-form-question';
import {MultipleChoiceQuestion} from '../../model/questions/multiple-choice-question';
import {ExtendedMatchingItems} from '../../model/questions/extended-matching-items';
import {MultipleChoiceQuestionAnswerDTO} from '../../model/DTOs/level/assessment/multipleChoiceQuestionAnswerDTO';
import {ExtendedMatchingItemsAnswerDTO} from '../../model/DTOs/level/assessment/extendedMatchingItemsAnswerDTO';
import {UserMapper} from './user.mapper.service';

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
  mapTrainingRunDTOsToTrainingRunsWithPagination(resource: TrainingRunRestResource): TableDataWithPaginationWrapper<TrainingRunTableDataModel[]> {
    const tableData: TrainingRunTableDataModel[] = [];
    resource.content.forEach(trainingRunDTO => {
      const tableRow = new TrainingRunTableDataModel();
      tableRow.trainingRun = this.mapTrainingRunDTOToTrainingRun(trainingRunDTO);
      tableRow.isWaitingForRevertResponse = false;
      tableData.push(tableRow);
    });

    const tablePagination = new TablePagination(resource.pagination.number,
      resource.pagination.number_of_elements,
      resource.pagination.size,
      resource.pagination.total_elements,
      resource.pagination.total_pages);
    return new TableDataWithPaginationWrapper(tableData, tablePagination);
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
    result.sandboxInstanceId = trainingRunDTO.sandbox_instance_ref.id;
    result.user = this.userMapper.mapUserFromUserRefDTO(trainingRunDTO.participant_ref);
    result.state = this.mapTrainigRunDTOStateToEnum(trainingRunDTO.state);

    if (result.currentLevel) {
      result.currentLevel = this.levelMapper.mapLevelDTOToLevel(trainingRunDTO.current_level);
    }
    if (result.trainingInstance) {
      result.trainingInstance = this.trainingInstanceMapper.mapTrainingInstanceDTOToTrainingInstance(trainingRunDTO.training_instance);
    }
    return result;
  }

  mapAccessTrainingRunDTOToAccessTrainingRun(accessDTO: AccessTrainingRunDTO): AccessTrainingRun {
    const result = new AccessTrainingRun();
    result.trainingRunId = accessDTO.training_run_id;
    result.sandboxInstanceId = accessDTO.sandbox_instance_id;
    result.currentLevel = this.levelMapper.mapLevelDTOToLevel(accessDTO.abstract_level_dto);
    result.levels = this.levelMapper.mapBasicInfoDTOsToAbstractLevels(accessDTO.info_about_levels);
    return result;
  }

  mapAccessedTrainingRunDTOsToTrainingRunTableObjects(resource: TrainingRunRestResource)
    : TableDataWithPaginationWrapper<TraineeAccessedTrainingsTableDataModel[]> {
    const tableData: TraineeAccessedTrainingsTableDataModel[] = [];
    resource.content.forEach(accessedTrainingRunDTO =>
      tableData.push(this.mapAccessedTrainingRunDTOToTrainingRunTableObject(accessedTrainingRunDTO)));
    const tablePagination = new TablePagination(resource.pagination.number,
      resource.pagination.number_of_elements,
      resource.pagination.size,
      resource.pagination.total_elements,
      resource.pagination.total_pages);
    return new TableDataWithPaginationWrapper(tableData, tablePagination);
  }


  mapAccessedTrainingRunDTOToTrainingRunTableObject(accessedTrainingRunDTO: AccessedTrainingRunDTO): TraineeAccessedTrainingsTableDataModel {
    const result = new TraineeAccessedTrainingsTableDataModel();
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
    questions.forEach(question => this.mapQuestionToUserAnswerDTO(question));
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
    result.text = question.usersAnswer;
    return result;
  }

  private mapMCQToUserAnswerDTO(question: MultipleChoiceQuestion): MultipleChoiceQuestionAnswerDTO {
    const result = new MultipleChoiceQuestionAnswerDTO();
    result.question_order = question.order;
    result.choices = question.usersAnswersIndexes;
    return result;
  }

  private mapEMIToUserAnswerDTO(question: ExtendedMatchingItems): ExtendedMatchingItemsAnswerDTO {
    const result = new ExtendedMatchingItemsAnswerDTO();
    result.question_order = question.order;
    result.pairs = [[]];
    question.usersAnswers
      .forEach(answer => {
        result.pairs.push([answer.x, answer.y]);
      });
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
      case PossibleActionEnum.TRYAGAIN: return TraineeAccessTrainingRunActionEnum.TryAgain;
      case PossibleActionEnum.RESULTS: return TraineeAccessTrainingRunActionEnum.Results;
      default: console.error('Could not map attribute "action" of "AccessedTrainingRunDTO to any known action');
    }
  }

  private mapTrainigRunDTOStateToEnum(state: TrainingRunDTO.StateEnum): TrainingRunStateEnum {
    switch (state) {
      case TrainingRunDTO.StateEnum.ALLOCATED: return TrainingRunStateEnum.Allocated;
      case TrainingRunDTO.StateEnum.ARCHIVED: return TrainingRunStateEnum.Archived;
      case TrainingRunDTO.StateEnum.NEW: return TrainingRunStateEnum.New;
      case TrainingRunDTO.StateEnum.READY: return TrainingRunStateEnum.Ready;
      default: {
        console.error('Could not map training run state to enum');
        return null;
      }
    }
  }
}
