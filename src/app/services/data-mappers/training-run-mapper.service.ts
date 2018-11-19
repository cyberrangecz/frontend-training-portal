import {Injectable} from '@angular/core';
import {TrainingRun} from '../../model/training/training-run';
import {TrainingRunDTO} from '../../model/DTOs/trainingRunDTO';
import {LevelMapperService} from './level-mapper.service';
import {TrainingRunStateEnum} from '../../enums/training-run-state.enum';
import {TrainingInstanceMapperService} from './training-instance-mapper.service';
import {TrainingRunRestResource} from '../../model/DTOs/trainingRunRestResource';
import {TrainingDefinitionMapperService} from './training-definition-mapper.service';

@Injectable()
export class TrainingRunMapperService {

  constructor(private levelMapper: LevelMapperService,
              private trainingInstanceMapper: TrainingInstanceMapperService,
              private trainingDefinitionMapper: TrainingDefinitionMapperService) {
  }

  /**
   * Maps training run DTOs retrieved from remote server to training run objects
   * @param trainingRunDTOs training run DTOs retrieved from remote server
   */
  mapTrainingRunDTOsToTrainingRuns(trainingRunDTOs: TrainingRunDTO[]): TrainingRun[] {
    const result: TrainingRun[] = [];
    trainingRunDTOs.forEach(trainingRunDTO =>
      result.push(this.mapTrainingRunDTOToTrainingRun(trainingRunDTO)));
    return result;
  }

  /**
   *
   * @param resource
   */
  mapTrainingRunDTOsWithPaginationToTrainingRuns(resource: TrainingRunRestResource): TrainingRun[] {
    return this.mapTrainingRunDTOsToTrainingRuns(resource.content);
  }

  /**
   * Maps training run DTO retrieved from remote server to training run object
   * @param trainingRunDTO training run DTO retrieved from remote server
   */
  mapTrainingRunDTOToTrainingRun(trainingRunDTO: TrainingRunDTO): TrainingRun {
    const result = new TrainingRun();
    result.id = trainingRunDTO.id;
    result.currentLevel = this.levelMapper.mapLevelDTOToLevel(trainingRunDTO.current_level);
    result.startTime = new Date(trainingRunDTO.start_time);
    result.endTime = new Date(trainingRunDTO.end_time);
    result.eventLogReference = trainingRunDTO.event_log_reference;
    result.sandboxInstanceId = trainingRunDTO.sandbox_instance_ref.id;
    result.state = this.mapTrainigRunDTOStateToEnum(trainingRunDTO.state);
    result.currentLevel = this.trainingDefinitionMapper.createLevelFromBasicInfo(trainingRunDTO.current_level);
    result.trainingInstance = this.trainingInstanceMapper.mapTrainingInstanceDTOToTrainingInstance(trainingRunDTO.training_instance);
    console.log(result);
    return result;
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
