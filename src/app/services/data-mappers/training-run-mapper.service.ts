import {Injectable} from '@angular/core';
import {TrainingRun} from '../../model/training/training-run';
import {TrainingRunDTO} from '../../model/DTOs/trainingRunDTO';
import {LevelMapperService} from './level-mapper.service';
import {TrainingRunStateEnum} from '../../enums/training-run-state.enum';
import {TrainingInstanceMapperService} from './training-instance-mapper.service';
import {TrainingRunRestResource} from '../../model/DTOs/trainingRunRestResource';
import {AccessedTrainingRunDTO} from "../../model/DTOs/accessedTrainingRunDTO";
import {TraineeAccessedTrainingsTableDataModel} from "../../model/table-models/trainee-accessed-trainings-table-data-model";
import {TraineeAccessTrainingRunActionEnum} from "../../enums/trainee-access-training-run-actions.enum";
import PossibleActionEnum = AccessedTrainingRunDTO.PossibleActionEnum;

@Injectable()
export class TrainingRunMapperService {

  constructor(private levelMapper: LevelMapperService,
              private trainingInstanceMapper: TrainingInstanceMapperService) {
  }

  /**
   * Maps training run DTOs retrieved from remote server to training run objects
   * @param resources training run DTOs retrieved from remote server
   */
  mapTrainingRunDTOsToTrainingRuns(resources: TrainingRunRestResource): TrainingRun[] {
    const result: TrainingRun[] = [];
    resources.content.forEach(trainingRunDTO =>
      result.push(this.mapTrainingRunDTOToTrainingRun(trainingRunDTO)));
    return result;
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
    result.state = this.mapTrainigRunDTOStateToEnum(trainingRunDTO.state);

    if (result.currentLevel) {
      result.currentLevel = this.levelMapper.mapLevelDTOToLevel(trainingRunDTO.current_level);
    }
    if (result.trainingInstance) {
      result.trainingInstance = this.trainingInstanceMapper.mapTrainingInstanceDTOToTrainingInstance(trainingRunDTO.training_instance);
    }
    return result;
  }

  mapAccessedTrainingRunDTOsToTrainingRunTableObjects(resource: TrainingRunRestResource): TraineeAccessedTrainingsTableDataModel[] {
    const result: TraineeAccessedTrainingsTableDataModel[] = [];
    resource.content.forEach(accessedTrainingRunDTO =>
      result.push(this.mapAccessedTrainingRunDTOToTrainingRunTableObject(accessedTrainingRunDTO)));
    return result;
  }


  mapAccessedTrainingRunDTOToTrainingRunTableObject(accessedTrainingRunDTO: AccessedTrainingRunDTO): TraineeAccessedTrainingsTableDataModel {
    const result = new TraineeAccessedTrainingsTableDataModel();
    result.currentLevel = accessedTrainingRunDTO.current_level_order;
    result.totalLevels = accessedTrainingRunDTO.number_of_levels;
    result.trainingInstanceTitle = accessedTrainingRunDTO.title;
    result.trainingInstanceStartTime = new Date(accessedTrainingRunDTO.training_instance_start_date);
    result.trainingInstanceEndTime = new Date(accessedTrainingRunDTO.training_instance_end_date);
    result.action = this.mapActionEnumFromDTOToTableDataModel(accessedTrainingRunDTO.possible_action);
    return result;
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
