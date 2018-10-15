import {Injectable} from "@angular/core";
import {TrainingInstanceDTO} from "../../model/DTOs/trainingInstanceDTO";
import {TrainingInstance} from "../../model/training/training-instance";
import {TrainingInstanceCreateDTO} from "../../model/DTOs/trainingInstanceCreateDTO";
import {TrainingInstanceUpdateDTO} from "../../model/DTOs/trainingInstanceUpdateDTO";

@Injectable()
export class TrainingInstanceMapperService {

  mapTrainingInstanceDTOsToTrainingInstances(trainingInstanceDTOs: TrainingInstanceDTO[]): TrainingInstance[] {
    const result: TrainingInstance[] = [];
    trainingInstanceDTOs.forEach(dto => result.push(this.mapTrainingInstanceDTOToTrainingInstance(dto)));
    return result;
  }

  mapTrainingInstanceDTOToTrainingInstance(trainingInstanceDTO: TrainingInstanceDTO): TrainingInstance {
    const result = new TrainingInstance();
    result.id = trainingInstanceDTO.id;
    //result.trainingDefinitionId TODO: not in the DTO -> consult
    result.startTime = trainingInstanceDTO.startTime;
    result.endTime = trainingInstanceDTO.endTime;
    result.title = trainingInstanceDTO.title;
    result.poolSize = trainingInstanceDTO.poolSize;
    // result.organizersIds TODO: not in the DTO
    return result;
  }

  mapTrainingInstanceToTrainingInstanceCreateDTO(trainingInstance: TrainingInstance): TrainingInstanceCreateDTO {
    const result = new TrainingInstanceCreateDTO();
    result.title = trainingInstance.title;
    result.poolSize = trainingInstance.poolSize;
    result.startTime = trainingInstance.startTime;
    result.endTime = trainingInstance.endTime;
    result.keyword = trainingInstance.keyword;
    // TODO: organizer IDs and associated training def
    return result;
  }

  mapTrainingInstanceToTrainingInstanceUpdateDTO(trainingInstance: TrainingInstance): TrainingInstanceUpdateDTO {
    const result = new TrainingInstanceUpdateDTO();
    result.id = trainingInstance.id;
    result.title = trainingInstance.title;
    result.poolSize = trainingInstance.poolSize;
    result.startTime = trainingInstance.startTime;
    result.endTime = trainingInstance.endTime;
    result.keyword = trainingInstance.keyword;
    // TODO: organizer IDs and asscoiated training def
    return result;
  }
}
