import {Injectable} from '@angular/core';
import {TrainingRun} from '../../model/training/training-run';
import {TrainingRunDTO} from '../../model/DTOs/training-run/training-run-dto';
import {LevelMapper} from './level-mapper.service';
import {TrainingRunStateEnum} from '../../model/enums/training-run-state.enum';
import {TrainingInstanceMapper} from './training-instance-mapper.service';
import {TrainingRunRestResource} from '../../model/DTOs/training-run/training-run-rest-resource';
import {AccessedTrainingRunDTO} from '../../model/DTOs/training-run/accessed-training-run-dto';
import {AccessedTrainingRunsTableRow} from '../../model/table-adapters/accessed-training-runs-table-row';
import {TraineeAccessTrainingRunActionEnum} from '../../model/enums/trainee-access-training-run-actions.enum';
import {PaginatedTable} from '../../model/table-adapters/paginated-table';
import {TrainingRunTableRow} from '../../model/table-adapters/training-run-table-row';
import {TableAdapterPagination} from '../../model/table-adapters/table-adapter-pagination';
import {AccessTrainingRunDTO} from '../../model/DTOs/training-run/access-training-run-dto';
import {AccessTrainingRunInfo} from '../../model/training/access-training-run-info';
import {IsCorrectFlagDTO} from '../../model/DTOs/level/game/is-correct-flag-dto';
import {FlagCheck} from '../../model/level/flag-check';
import {AbstractQuestion} from '../../model/questions/abstract-question';
import {AbstractAssessmentAnswerDTO} from '../../model/DTOs/level/assessment/abstract-assessment-answer-dto';
import {FreeFormAnswerDTO} from '../../model/DTOs/level/assessment/free-form-answer-dto';
import {FreeFormQuestion} from '../../model/questions/free-form-question';
import {MultipleChoiceQuestion} from '../../model/questions/multiple-choice-question';
import {ExtendedMatchingItems} from '../../model/questions/extended-matching-items';
import {MultipleChoiceQuestionAnswerDTO} from '../../model/DTOs/level/assessment/multiple-choice-question-answer-dto';
import {ExtendedMatchingItemsAnswerDTO} from '../../model/DTOs/level/assessment/extended-matching-items-answer-dto';
import {UserMapper} from './user.mapper.service';
import {EmiChoiceDTO} from '../../model/DTOs/level/assessment/emi-choice-dto';
import PossibleActionEnum = AccessedTrainingRunDTO.PossibleActionEnum;
import {BasicLevelInfoDTO} from "../../model/DTOs/level/basic-level-info-dto";
import LevelTypeEnum = BasicLevelInfoDTO.LevelTypeEnum;
import {GameLevel} from "../../model/level/game-level";

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
  mapTrainingRunDTOsToTrainingRunsWithPagination(resource: TrainingRunRestResource): PaginatedTable<TrainingRunTableRow[]> {
    const tableData: TrainingRunTableRow[] = [];
    resource.content.forEach(trainingRunDTO => {
      const tableRow = new TrainingRunTableRow();
      tableRow.trainingRun = this.mapTrainingRunDTOToTrainingRun(trainingRunDTO);
      tableData.push(tableRow);
    });

    const tablePagination = new TableAdapterPagination(resource.pagination.number,
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
    result.trainingDefinitionId = trainingRunDTO.definition_id;
    result.trainingInstanceId = trainingRunDTO.instance_id;
    result.startTime = new Date(trainingRunDTO.start_time);
    result.endTime = new Date(trainingRunDTO.end_time);
    result.eventLogReference = trainingRunDTO.event_log_reference;
    if (trainingRunDTO.sandbox_instance_ref) {
      result.sandboxInstanceId = trainingRunDTO.sandbox_instance_ref.sandbox_instance_ref;
    }

    result.player = this.userMapper.mapUserRefDTOToUser(trainingRunDTO.participant_ref);
    result.state = this.mapTrainigRunDTOStateToEnum(trainingRunDTO.state);

    if (result.currentLevel) {
      result.currentLevel = this.levelMapper.mapLevelDTOToLevel(trainingRunDTO.current_level);
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

  mapAccessedTrainingRunDTOsToTrainingRunTableObjects(resource: TrainingRunRestResource)
    : PaginatedTable<AccessedTrainingRunsTableRow[]> {
    const tableData: AccessedTrainingRunsTableRow[] = [];
    resource.content.forEach(accessedTrainingRunDTO =>
      tableData.push(this.mapAccessedTrainingRunDTOToTrainingRunTableObject(accessedTrainingRunDTO)));
    const tablePagination = new TableAdapterPagination(resource.pagination.number,
      resource.pagination.number_of_elements,
      resource.pagination.size,
      resource.pagination.total_elements,
      resource.pagination.total_pages);
    return new PaginatedTable(tableData, tablePagination);
  }


  mapAccessedTrainingRunDTOToTrainingRunTableObject(accessedTrainingRunDTO: AccessedTrainingRunDTO): AccessedTrainingRunsTableRow {
    const result = new AccessedTrainingRunsTableRow();
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
      case TrainingRunDTO.StateEnum.RUNNING: return TrainingRunStateEnum.RUNNING;
      case TrainingRunDTO.StateEnum.FINISHED: return TrainingRunStateEnum.FINISHED;
      case TrainingRunDTO.StateEnum.ARCHIVED: return TrainingRunStateEnum.ARCHIVED;
      default: {
        console.error('Could not map training run state to enum');
        return null;
      }
    }
  }
}
