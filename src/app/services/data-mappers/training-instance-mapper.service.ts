import {Injectable} from "@angular/core";
import {TrainingInstanceDTO} from "../../model/DTOs/trainingInstanceDTO";
import {TrainingInstance} from "../../model/training/training-instance";
import {TrainingInstanceCreateDTO} from "../../model/DTOs/trainingInstanceCreateDTO";
import {TrainingInstanceUpdateDTO} from "../../model/DTOs/trainingInstanceUpdateDTO";

@Injectable()
export class TrainingInstanceMapperService {

  /**
   * Maps training instance dtos received from remote server to training instance objects
   * @param trainingInstanceDTOs array of training instance dtos received from remote server
   */
  mapTrainingInstanceDTOsToTrainingInstances(trainingInstanceDTOs: TrainingInstanceDTO[]): TrainingInstance[] {
    const result: TrainingInstance[] = [];
    trainingInstanceDTOs.forEach(dto => result.push(this.mapTrainingInstanceDTOToTrainingInstance(dto)));
    return result;
  }

  /**
   * Maps training instance dto received from remote server to training instance object
   * @param trainingInstanceDTO training instance dto received from remote server
   */
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

  /**
   * Maps training instance object to training instance create dto used to create new resource on the remote server
   * @param trainingInstance training instance object which should be created
   */
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

  /**
   * Maps trainign instance object to training instance update dto used to update existing resource on the remote server
   * @param trainingInstance training instance object which should be updated
   */
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
