import {Injectable} from "@angular/core";
import {TrainingInstanceDTO} from "../../model/DTOs/trainingInstanceDTO";
import {TrainingInstance} from "../../model/training/training-instance";
import {TrainingInstanceCreateDTO, TrainingInstanceCreateDTOClass} from "../../model/DTOs/trainingInstanceCreateDTO";
import {TrainingInstanceUpdateDTO, TrainingInstanceUpdateDTOClass} from "../../model/DTOs/trainingInstanceUpdateDTO";
import {TrainingInstanceRestResource} from "../../model/DTOs/trainingInstanceRestResource";
import {TrainingDefinitionMapperService} from './training-definition-mapper.service';
import {TrainingDefinitionDTO} from '../../model/DTOs/trainingDefinitionDTO';
import {UserRefDTO} from '../../model/DTOs/userRefDTO';

@Injectable()
export class TrainingInstanceMapperService {

  constructor(private trainingDefinitionMapper: TrainingDefinitionMapperService) {

  }

  /**
   * Maps training instance dtos received from remote server to training instance objects
   * @param trainingInstanceDTOs array of training instance dtos received from remote server
   */
  mapTrainingInstanceDTOsToTrainingInstances(trainingInstanceDTOs: TrainingInstanceRestResource): TrainingInstance[] {
    const result: TrainingInstance[] = [];
    trainingInstanceDTOs.content.forEach(dto => result.push(this.mapTrainingInstanceDTOToTrainingInstance(dto)));
    return result;
  }

  /**
   * Maps training instance dto received from remote server to training instance object
   * @param trainingInstanceDTO training instance dto received from remote server
   */
  mapTrainingInstanceDTOToTrainingInstance(trainingInstanceDTO: TrainingInstanceDTO): TrainingInstance {
    const result = new TrainingInstance();
    result.id = trainingInstanceDTO.id;
    result.trainingDefinition = this.trainingDefinitionMapper
      .mapTrainingDefinitionDTOToTrainingDefinition(trainingInstanceDTO.training_definition);
    result.startTime = new Date(trainingInstanceDTO.start_time);
    result.endTime = new Date(trainingInstanceDTO.end_time);
    result.title = trainingInstanceDTO.title;
    result.poolSize = trainingInstanceDTO.pool_size;
    result.organizersIds = trainingInstanceDTO.organizers.map(organizer => organizer.id);
    result.keyword = trainingInstanceDTO.password;
    return result;
  }

  /**
   * Maps training instance object to training instance create dto used to create new resource on the remote server
   * @param trainingInstance training instance object which should be created
   */
  mapTrainingInstanceToTrainingInstanceCreateDTO(trainingInstance: TrainingInstance): TrainingInstanceCreateDTO {
    const result = new TrainingInstanceCreateDTOClass();
    result.title = trainingInstance.title;
    result.pool_size = trainingInstance.poolSize;
    result.start_time = new Date(trainingInstance.startTime);
    result.end_time = new Date(trainingInstance.endTime);
    result.keyword = trainingInstance.keyword;
    result.organizers = this.mapOrganizersToInstanceDTO(trainingInstance.organizersIds);
    result.training_definition = trainingInstance.trainingDefinition.id;
    return result;
  }

  /**
   * Maps trainign instance object to training instance update dto used to update existing resource on the remote server
   * @param trainingInstance training instance object which should be updated
   */
  mapTrainingInstanceToTrainingInstanceUpdateDTO(trainingInstance: TrainingInstance): TrainingInstanceUpdateDTO {
    const result = new TrainingInstanceUpdateDTOClass();
    result.title = trainingInstance.title;
    result.pool_size = trainingInstance.poolSize;
    result.start_time = new Date(trainingInstance.startTime);
    result.end_time = new Date(trainingInstance.endTime);
    result.keyword = trainingInstance.keyword;
    result.organizers = this.mapOrganizersToInstanceDTO(trainingInstance.organizersIds);
    result.training_definition = trainingInstance.trainingDefinition.id;
    return result;
  }

  private mapOrganizersToInstanceDTO(organizerIds: number[]): UserRefDTO[] {
    const result: UserRefDTO[] = [];
    organizerIds.forEach(organizerId => result.push({ id: organizerId ,user_ref_id: organizerId }));
    return result;
  }
}
