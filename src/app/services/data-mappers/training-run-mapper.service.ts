import {Injectable} from "@angular/core";
import {TrainingRun} from "../../model/training/training-run";
import {TrainingRunDTO} from "../../model/DTOs/trainingRunDTO";
import {LevelMapperService} from "./level-mapper.service";
import {TrainingRunStateEnum} from "../../enums/training-run-state.enum";
import {TrainingInstanceMapperService} from "./training-instance-mapper.service";

@Injectable()
export class TrainingRunMapperService {

  constructor(private levelMapper: LevelMapperService,
              private trainingInstanceMapper: TrainingInstanceMapperService) {
  }

  /**
   * Maps training run DTOs retrieved from remote server to training run objects
   * @param trainingRunDTOs training run DTOs retrieved from remote server
   */
  mapTrainingRunDTOsToTrainingRuns(trainingRunDTOs: TrainingRunDTO[]): TrainingRun[] {
    const result: TrainingRun[] = [];
    trainingRunDTOs.forEach(trainingRunDTO => result.push(this.mapTrainingRunDTOToTrainingRun(trainingRunDTO)));
    return result;
  }

  /**
   * Maps training run DTO retrieved from remote server to training run object
   * @param trainingRunDTO training run DTO retrieved from remote server
   */
  mapTrainingRunDTOToTrainingRun(trainingRunDTO: TrainingRunDTO): TrainingRun {
    const result = new TrainingRun();
    result.id = trainingRunDTO.id;
    result.currentLevel = this.levelMapper.mapLevelDTOToLevel(trainingRunDTO.currentLevel);
    result.startTime = trainingRunDTO.startTime;
    result.endTime = trainingRunDTO.endTime;
    result.eventLogReference = trainingRunDTO.eventLogReference;
    result.sandboxInstanceId = trainingRunDTO.sandboxInstanceRef.id;
    result.state = TrainingRunStateEnum[trainingRunDTO.state];
    result.trainingInstance = this.trainingInstanceMapper.mapTrainingInstanceDTOToTrainingInstance(trainingRunDTO.trainingInstance);
    return result;
  }


}
